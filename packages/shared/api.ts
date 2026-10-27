import * as z from "zod";

export const HealthResponseSchema = z.object({
  stat: z.literal("ok"),
  timestamp: z.iso.datetime(),
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;
