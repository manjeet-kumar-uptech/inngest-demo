import { inngest } from "../../../../inngest/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user } = body;

    await inngest.send({
      name: "demo/hello",
      data: { user: user || "Nothing else, just raw data." },
    });

    return Response.json({ status: "sent" });
  } catch {
    return Response.json({ error: "Failed to send event" }, { status: 500 });
  }
}
