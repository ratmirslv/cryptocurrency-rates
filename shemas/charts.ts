import { z } from "zod";

export const chartsSchema = z.array(
  z.union([
    z.object({
      fromTicker: z.string(),
      toTicker: z.string(),
      chartData: z.array(z.object({ date: z.number(), rate: z.number() })),
    }),
    z.object({
      fromTicker: z.string(),
      toTicker: z.string(),
      chartData: z.array(z.unknown()),
    }),
  ])
);

export type ChartsResponse = z.infer<typeof chartsSchema>;
