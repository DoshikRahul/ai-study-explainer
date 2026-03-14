import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateChatResponse(
  messages: { role: "user" | "model"; text: string }[],
  modelName: string = "gemini-3-flash-preview",
  customApiKey?: string
): Promise<string> {
  const apiKey = customApiKey || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing. Please provide your API key in the setup screen.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: modelName });

  const formattedHistory = messages.slice(0, -1).map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.text }],
  }));

  const latestMessage = messages[messages.length - 1];

  let chatSession;
  try {
    chatSession = model.startChat({
      history: formattedHistory,
      systemInstruction: "You are an expert AI tutor designed to explain complex subjects to students. Your explanations should be clear, engaging, easy to understand, and fun. Use markdown formatting, analogies, and bullet points to break down complex concepts.",
    });

    const result = await chatSession.sendMessage(latestMessage.text);
    return result.response.text();
  } catch (error: any) {
    console.error("Gemini Multi-Turn API Error:", error);

    if (error.status === 429 || error?.message?.includes("429")) {
        throw new Error("You've exceeded your current free-tier API quota. Please check your billing details or wait a bit.");
    }
    throw new Error(error.message || "Failed to generate explanation. Please try again.");
  }
}
