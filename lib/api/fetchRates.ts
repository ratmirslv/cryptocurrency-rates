import { ratesSchema, RatesResponse } from "../../shemas/rates";

const URL_RATES = "https://app.youhodler.com/api/v3/rates/extended";

export type CurrencyRates = Array<
  { currencyName: string } & RatesResponse[keyof RatesResponse]
>;

export const fetchRates = async (): Promise<CurrencyRates> => {
  const response = await fetch(URL_RATES);
  if (!response.ok) {
    throw new Error("Failed to fetch rates");
  }

  const json = await response.json();
  const result = ratesSchema.safeParse(json);

  if (!result.success) {
    console.error("Validation Error:", result.error);
    throw new Error("Invalid data format");
  }

  const currencyRates = Object.entries(result.data).map(
    ([currency, rates]) => ({
      currencyName: currency,
      ...rates,
    })
  );

  return currencyRates;
};
