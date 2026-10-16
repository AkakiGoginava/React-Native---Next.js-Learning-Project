async function handleUnsupportedMethod() {
  return Response.json({ message: "Unsupported method" }, { status: 405 });
}

export async function GET() {
  return Response.json(
    {
      status: "ok",
      timestamp: new Date(Date.now()).toISOString(),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export const POST = handleUnsupportedMethod;
export const PUT = handleUnsupportedMethod;
export const PATCH = handleUnsupportedMethod;
export const DELETE = handleUnsupportedMethod;
