import { HealthResponseSchema } from "@pickup/shared/api";
import Constants from "expo-constants";
import { Stack } from "expo-router";
import { useEffect } from "react";
import * as z from "zod";

export default function RootLayout() {
  useEffect(() => {
    async function checkHealth() {
      try {
        // NOTE: move URL resolution logic to a utility helper function in RNNJLP-18
        const portRegex = new RegExp(":\\d+$");
        const hostUri = Constants.expoConfig?.hostUri;
        const url = hostUri
          ? `http://${hostUri.replace(portRegex, ":3000")}/api/health`
          : process.env.EXPO_PUBLIC_API_URL;

        if (!url) throw new Error("API url not configured");

        const res = await fetch(url);

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
