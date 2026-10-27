import * as z from "zod";

export const HealthResponseSchema = z.object({
  status: z.string(),
  timestamp: z.iso.datetime(),
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;
