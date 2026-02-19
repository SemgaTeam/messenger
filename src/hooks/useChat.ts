import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { singletonSocket } from "@/lib/wsclient";
import { Chat, Message, User } from "@/types/types";

export function useChat(): {
  messages: Message[];
  sendMessage: (currentUser: User, text: string) => void;
  selectedChat: Chat | null;
  setSelectedChat: Dispatch<SetStateAction<Chat | null>>;
} {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = singletonSocket();

  useEffect(() => {
    if (!selectedChat) return;
    socket.connect();
    socket.emit("joinChat", selectedChat?.id);

    const handleMessage = () => {
      fetch(`/api/messages/${selectedChat?.id}`)
        .then((r) => r.json())
        .then(setMessages);
    };

    handleMessage();
    socket.on("updateChat", handleMessage);
    return () => {
      socket.off("updateChat", handleMessage);
    };
  }, [selectedChat, socket]);

  const sendMessage = async (currentUser: User, text: string) => {
    if (!text || !selectedChat || !currentUser) return;

    const tempMessage: Message = {
      id: "",
      sender_id: currentUser.id,
      text: text,
      display_name: currentUser.display_name,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempMessage]);

    await fetch(`/api/messages/${selectedChat.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender_id: currentUser.id, text }),
    });

    socket.emit("updateChat", selectedChat?.id);
  };

  return { messages, sendMessage, selectedChat, setSelectedChat };
}
