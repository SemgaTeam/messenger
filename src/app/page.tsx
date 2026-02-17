"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/lib/UserContext";
import { useModal } from "@/hooks/UseModal";
import { useUsers } from "@/hooks/UseUsers";
import { useChat } from "@/hooks/useChat";
import { Chat } from "@/types/types";

import Sidebar from "@/components/SideBar";
import ChatWindow from "@/components/ChatWindow";
import UserSelection from "@/components/UserSelection";

export default function Home() {
  const { currentUser, setCurrentUser } = useUser();
  const [chats, setChats] = useState<Chat[]>([]);
  const { messages, sendMessage, selectedChat, setSelectedChat } = useChat();

  const modal = useModal();
  const users = useUsers();

  // Load users and chats
  useEffect(() => {
    users.loadUsers();
    fetch("/api/chats")
      .then((r) => r.json())
      .then(setChats);
  }, []);

  // Open modal window
  const openModal = () => {
    modal.open();
    users.loadUsers();
  };

  // Choose users is not chosen
  if (!currentUser) {
    return <UserSelection users={users.users} onSelect={setCurrentUser} />;
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        currentUser={currentUser}
        chats={chats}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        modal={modal}
        users={users}
        openModal={openModal}
        setChats={setChats}
      />
      <ChatWindow
        currentUser={currentUser}
        selectedChat={selectedChat}
        messages={messages}
        sendMessage={sendMessage}
      />
    </div>
  );
}
