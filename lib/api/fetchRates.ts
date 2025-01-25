import { Coin } from "@/pages/api/coinMap";
import { coingeckoSchema } from "@/shemas/coingecko";
import { ratesSchema, RatesResponse } from "@/shemas/rates";

const URL_RATES = "https://app.youhodler.com/api/v3/rates/extended";

export type CurrencyRates = Array<
  {
    name: string;
    order: number;
    symbol: string;
    image: string;
  } & RatesResponse[keyof RatesResponse]
>;

export const fetchRates = async (): Promise<CurrencyRates> => {
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
    }))
    .filter((rate) => rate.image);

  return enrichedCurrencyRates;
};
