import { ragChat } from "@/app/lib/rag";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { messages, sessionId } = await req.json();
  const lastMessage = messages[messages.length - 1].content;
  const res = await ragChat.chat(lastMessage, { streaming: true, sessionId });
  console.log(res.output);
  return aiUseChatAdapter(res);
};
