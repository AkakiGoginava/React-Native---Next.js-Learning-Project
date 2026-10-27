import { HealthResponseSchema } from "@pickup/shared/api";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    async function checkHealth() {
      const res = await fetch("http://10.207.89.228:3000/api/health");
      const data = await res.json();

      const parsedData = HealthResponseSchema.parse(data);
      console.log("Health status: ", parsedData.status);
    }

    checkHealth();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
