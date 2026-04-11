export async function GET(request) {
  return Response.json({
    message: "This is the about API route",
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request) {
  const data = await request.json();
  return Response.json({
    message: "POST received",
    receivedData: data,
  });
}
