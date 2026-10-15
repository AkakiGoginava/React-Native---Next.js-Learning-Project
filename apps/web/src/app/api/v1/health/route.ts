async function handleUnsupportedMethod() {
  return Response.json({ status: 405 });
}

export async function GET() {
  return Response.json({
    status: 200,
    timeStamp: new Date(Date.now()).toString(),
  });
}

export const POST = handleUnsupportedMethod;
export const PUT = handleUnsupportedMethod;
export const PATCH = handleUnsupportedMethod;
export const DELETE = handleUnsupportedMethod;
