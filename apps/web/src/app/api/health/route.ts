import { HealthResponse } from "@pickup/shared/api";

async function handleUnsupportedMethod() {
  return Response.json({ message: "Unsupported method" }, { status: 405 });
}

export async function GET() {
  const healthResponse: HealthResponse = {
    status: "ok",
    timestamp: new Date().toISOString(),
  };

  return Response.json(healthResponse, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export const POST = handleUnsupportedMethod;
export const PUT = handleUnsupportedMethod;
export const PATCH = handleUnsupportedMethod;
export const DELETE = handleUnsupportedMethod;
