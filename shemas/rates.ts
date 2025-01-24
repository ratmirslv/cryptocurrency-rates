import { z } from "zod";

const currencyDataSchema = z.object({
  rate: z.number(),
  ask: z.number(),
  bid: z.number(),
  diff24h: z.number(),
});

const cryptoSchema = z
  .object({
    usd: currencyDataSchema.optional(),
  })
  .passthrough();

export const ratesSchema = z.record(z.string(), cryptoSchema);

export type RatesResponse = z.infer<typeof ratesSchema>;
