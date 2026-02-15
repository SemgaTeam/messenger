import { useState, useRef, useEffect } from "react";
import { Chat, Message, User } from "@/types/types";

interface ChatWindowProps {
  currentUser: User;
  selectedChat: Chat | null;
  messages: Message[];
  sendMessage: (user: User, text: string) => void;
}

export default function ChatWindow({
  currentUser,
  selectedChat,
  messages,
  sendMessage,
}: ChatWindowProps) {
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const sendMessageAct = () => {
    if (!text || !selectedChat) return;
    sendMessage(currentUser, text);
    setText("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedChat) {
    return (
      <div className="flex items-center justify-center flex-1 text-gray-400 text-lg">
        Select a chat to start messaging
      </div>
    );
  }

  const chatPartnerName =
    selectedChat.user1 === currentUser.display_name
      ? selectedChat.user2
      : selectedChat.user1;

  return (
    <div className="flex-1 flex flex-col p-4">
      <h3 className="text-xl font-semibold mb-2">{chatPartnerName}</h3>

      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-xs p-2 rounded ${
              m.sender_id === currentUser.id
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-700 text-gray-100 mr-auto"
            }`}
          >
            <p className="text-sm font-semibold">{m.display_name}</p>
            <p>{m.text}</p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          autoFocus
          onKeyDown={(e) => e.key === "Enter" && sendMessageAct()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={sendMessageAct}
        >
          Send
        </button>
      </div>
    </div>
  );
}
