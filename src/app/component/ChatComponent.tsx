"use client";
import { useChat } from "ai/react";
import { FaPaperPlane, FaUser, FaRobot } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const ChatComponent = ({ sessionId }: { sessionId: string }) => {
  const { messages, setMessages, input, handleSubmit, handleInputChange } =
    useChat({
      api: "/api/chat-stream",
      body: { sessionId },
    });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 font-sans">
      <h1 className="text-center mb-6">
        <span className="block text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-500">
          Welcome to Dialogue
        </span>
        <span className="block text-2xl font-semibold text-zinc-300 mt-2">
          Interview Web Applications
          <span className="inline-block ml-2 animate-bounce">🐳</span>
        </span>
      </h1>

      <div className="w-full max-w-2xl bg-zinc-900 p-6 rounded-lg shadow-md border border-zinc-700">
        <div className="mb-4">
          <div className="h-96 overflow-y-auto bg-zinc-800 border-[1px] font-extralight border-zinc-700 p-4 rounded-lg mb-4 text-zinc-400">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-md mb-2 border-zinc-700 border-[1px] flex items-start ${
                    msg.role === "user" ? "bg-zinc-900" : "bg-zinc-700"
                  }`}
                >
                  <div className="mr-2 mt-1">
                    {msg.role === "user" ? (
                      <FaUser className="text-zinc-400" />
                    ) : (
                      <FaRobot className="text-sky-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      className="prose prose-zinc prose-sm"
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-zinc-400">
                No messages yet. Start the conversation!
              </div>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            className="w-full p-3 rounded-md text-black bg-zinc-500 focus:outline-none"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="ml-4 p-3 bg-lime-500 hover:bg-amber-600 text-zinc-900 font-bold rounded-md transition duration-300 flex items-center justify-center"
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};
