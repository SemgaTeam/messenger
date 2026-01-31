'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/lib/UserContext';

interface User {
  id: string;
  display_name: string;
  status: string;
}

interface Chat {
  id: string;
  user1: string;
  user2: string;
}

interface Message {
  id: string;
  sender_id: string;
  display_name: string;
  text: string;
  created_at: string;
}

export default function Home() {
  const { currentUser, setCurrentUser } = useUser();

  const [users, setUsers] = useState<User[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');

  // Загрузка пользователей и чатов
  useEffect(() => {
    fetch('/api/users').then(r => r.json()).then(setUsers);
    fetch('/api/chats').then(r => r.json()).then(setChats);
  }, []);

  // Загрузка сообщений выбранного чата
  useEffect(() => {
    if (!selectedChat) return;
    fetch(`/api/messages/${selectedChat.id}`).then(r => r.json()).then(setMessages);
  }, [selectedChat]);

  const sendMessage = async () => {
    if (!text || !selectedChat || !currentUser) return;

    await fetch(`/api/messages/${selectedChat.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender_id: currentUser.id, text }),
    });

    setText('');
    const newMessages = await fetch(`/api/messages/${selectedChat.id}`).then(r => r.json());
    setMessages(newMessages);
  };

  // Если пользователь не выбран
  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-3xl font-bold mb-6">Select User</h2>
        <div className="flex flex-col gap-3">
          {users.map(u => (
            <button
              key={u.id}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              onClick={() => setCurrentUser(u)}
            >
              {u.display_name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Получаем имя собеседника для заголовка чата
  const chatPartnerName = selectedChat
    ? selectedChat.user1 === currentUser.display_name
      ? selectedChat.user2
      : selectedChat.user1
    : '';

  return (
    <div className="flex h-screen">
      {/* Левая панель */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col p-4">
        {/* Профиль */}
        <div className="mb-4 p-4 bg-gray-700 rounded shadow-sm">
          <p className="font-bold text-lg">{currentUser.display_name}</p>
          <p className="text-gray-300 text-sm">{currentUser.status}</p>
        </div>

        {/* Чаты */}
        <h3 className="text-lg font-semibold mb-2">Chats</h3>
        <div className="flex flex-col gap-2 overflow-y-auto flex-1">
          {chats.map(c => (
            <div
              key={c.id}
              className={`p-2 rounded cursor-pointer transition ${
                selectedChat?.id === c.id
                  ? 'bg-blue-500 font-semibold'
                  : 'hover:bg-gray-700'
              }`}
              onClick={() => setSelectedChat(c)}
            >
              {c.user1 === currentUser.display_name ? c.user2 : c.user1}
            </div>
          ))}
        </div>
      </div>

      {/* Правая панель — чат */}
      <div className="flex-1 flex flex-col p-4">
        {selectedChat ? (
          <>
            <h3 className="text-xl font-semibold mb-2">{chatPartnerName}</h3>

            <div className="flex-1 overflow-y-auto mb-4 space-y-2">
              {messages.map(m => (
                <div
                  key={m.id}
                  className={`max-w-xs p-2 rounded ${
                    m.sender_id === currentUser.id
                      ? 'bg-blue-500 text-white ml-auto'
                      : 'bg-gray-700 text-gray-100 mr-auto'
                  }`}
                >
                  <p className="text-sm font-semibold">{m.display_name}</p>
                  <p>{m.text}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                className="flex-1 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Type a message..."
                onKeyDown={e => {
                  if (e.key === 'Enter') sendMessage();
                }}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-400 text-lg">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
