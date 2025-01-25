import { z } from "zod";

export const coingeckoSchema = z.array(
  z.object({
    id: z.string(),
    symbol: z.string(),
    name: z.string(),
    image: z.string(),
  })
);

export type CoingeckoResponse = z.infer<typeof coingeckoSchema>;
