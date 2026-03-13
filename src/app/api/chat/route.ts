import { NextResponse } from "next/server";
import { generateChatResponse } from "@/lib/aiClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, model } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid prompt. Please provide chat messages." },
        { status: 400 }
      );
    }

    const responseText = await generateChatResponse(messages, model);

    return NextResponse.json({ response: responseText });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate response." },
      { status: 500 }
    );
  }
}
