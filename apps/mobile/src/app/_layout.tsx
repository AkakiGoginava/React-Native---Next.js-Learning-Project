import { getApiUrl } from "@/util";
import { HealthResponseSchema } from "@pickup/shared/api";
import { Stack } from "expo-router";
import { useEffect } from "react";
import * as z from "zod";

export default function RootLayout() {
  useEffect(() => {
    async function checkHealth() {
      try {
        const apiUrl = getApiUrl();
        const res = await fetch(apiUrl);

        if (res.ok) {
          const data = await res.json();
          const parsedData = HealthResponseSchema.parse(data);
          console.log("Health status: ", parsedData.status);
        } else {
          throw new Error(`Rejected with status code ${res.status}`);
        }
      } catch (error: unknown) {
        if (error instanceof z.ZodError) {
          console.error(error.message);
        } else if (error instanceof Error) {
          console.error("Health status error: ", error.message);
        } else {
          console.error(error);
        }
      }
    }

    checkHealth();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
