import { Coin } from "@/pages/api/coinMap";
import { chartsSchema } from "@/shemas/charts";
import { coingeckoSchema } from "@/shemas/coingecko";
import { ratesSchema, RatesResponse } from "@/shemas/rates";

const URL_RATES = "https://app.youhodler.com/api/v3/rates/extended";

export type CurrencyRate = {
  name: string;
  order: number;
  symbol: string;
  image: string;
  charts: number[];
} & RatesResponse[keyof RatesResponse];

export const fetchRates = async (): Promise<Array<CurrencyRate>> => {
  const coinMapResponse = await fetch("/api/coinMap");
  if (!coinMapResponse.ok) {
    throw new Error("Failed to fetch coin data");
  }
  const coins: Coin[] = await coinMapResponse.json();

  const coinMap = coins.reduce<Record<string, Coin>>((acc, coin) => {
    acc[coin.symbol.toLowerCase()] = coin;
    return acc;
  }, {});

  const ratesResponse = await fetch(URL_RATES);

  if (!ratesResponse.ok) {
    throw new Error("Failed to fetch rates");
  }
  const json = await ratesResponse.json();
  const result = ratesSchema.safeParse(json);

  if (!result.success) {
    console.error("Validation Error:", result.error);
    throw new Error("Invalid data format");
  }

  const currencyRates = Object.entries(result.data).map(
    ([currency, rates], index) => ({
      symbol: currency,
      order: index + 1,
      name: coinMap[currency]?.name || currency,
      id: coinMap[currency]?.id || currency,
      ...rates,
    })
  );

  const symbols = currencyRates.map((rate) => rate.symbol);

  const queryString = symbols
    .map((symbol) => `symbol=${encodeURIComponent(`${symbol}/usd`)}`)
    .join("&");

  const requestUrl = `https://app.youhodler.com/api/v3/rates/chart/preview?${queryString}`;

  const chartsResponse = await fetch(requestUrl);
  if (!chartsResponse.ok) {
    throw new Error(`Failed to fetch chart data: ${chartsResponse.statusText}`);
  }

  const chartsData = await chartsResponse.json();

  const chartsResult = chartsSchema.safeParse(chartsData);

  if (!chartsResult.success) {
    console.error("Validation Error:", result.error);
    throw new Error("Invalid data format");
  }

  const chartsMap: Record<
    string,
    Array<{ date: number; rate: number }>
  > = chartsResult.success
    ? chartsResult.data.reduce<
        Record<string, Array<{ date: number; rate: number }>>
      >((acc, chart) => {
        acc[chart.fromTicker] = chart.chartData as Array<{
          date: number;
          rate: number;
        }>;
        return acc;
      }, {})
    : {};

  const idsForRequest = currencyRates
    .map((curr) => curr.id)
    .filter(Boolean)
    .join(",");

  const coinGeckoResponse = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&ids=${idsForRequest}`
  );

  if (!coinGeckoResponse.ok) {
    throw new Error("Failed to fetch data from CoinGecko");
  }

  const jsonCoinGecko = await coinGeckoResponse.json();
  const coingeckoResult = coingeckoSchema.safeParse(jsonCoinGecko);

  if (!coingeckoResult.success) {
    console.error("Validation Error:", result.error);
    throw new Error("Invalid data format");
  }

  const coinGeckoMap = coingeckoResult.data.reduce<Record<string, string>>(
    (acc, coin) => {
      acc[coin.id] = coin.image;
      return acc;
    },
    {}
  );

  const enrichedCurrencyRates = currencyRates
    .map((rate) => ({
      ...rate,
      image: coinGeckoMap[rate.id],
      charts: chartsMap[rate.symbol].map((chart) => chart.rate),
    }))
    .filter((rate) => rate.image && rate.image.startsWith("https://"));

  return enrichedCurrencyRates;
};
