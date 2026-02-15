'use client';

import { useState, useEffect, use, useRef } from 'react';
import { useUser } from '@/lib/UserContext';
import { useModal } from '@/hooks/UseModal';
import { useUsers } from '@/hooks/UseUsers';
import ShowUsersButton from '@/components/ShowUsersModalButton';
import { UsersModal } from '@/components/UsersModal';
import { getChat } from './service/ChatService';
import { useChat } from '@/hooks/useChat';

export interface Chat {
  id: string;
  user1: string;
  user2: string;
}

export interface Message {
  id: string;
  sender_id: string;
  display_name: string;
  text: string;
  created_at: string;
}

export default  function Home() {
  const { currentUser, setCurrentUser } = useUser();

  const [chats, setChats] = useState<Chat[]>([]);
  const { messages, sendMessage, selectedChat, setSelectedChat } = useChat();
  const [text, setText] = useState('');

  const modal = useModal();
  const users = useUsers();

  const openModal = () => {
    modal.open();
    users.loadUsers();
  }

  // Загрузка пользователей и чатов
  useEffect(() => {
    users.loadUsers();
    fetch('/api/chats').then(r => r.json()).then(setChats);
  }, []);


  const sendMessageAct = () => {
    if (!text || !selectedChat || !currentUser)
       return;

    sendMessage(currentUser, text)

    setText('');
  };
    
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  // Если пользователь не выбран
  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-3xl font-bold mb-6">Select User</h2>
        <div className="flex flex-col gap-3">
          {users.users.map(u => (
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
        <>
          <ShowUsersButton onClick={openModal}/>
          <UsersModal
            isOpen={modal.isOpen}
            users={users.users}
            loading={users.loading}
            error={users.error}
            onClose={modal.close}
            onSelect={async (user) => {
              const chat = await getChat(currentUser.id, user.id)
              modal.close();
              fetch('/api/chats').then(r => r.json()).then(setChats);
              setSelectedChat(chat);
            }}
          />  
        </>
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
              <div ref={bottomRef} />
            </div>

            <div className="flex gap-2">
              <input
                className="flex-1 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Type a message..."
                autoFocus
                onKeyDown={e => {
                  if (e.key === 'Enter') sendMessageAct();
                }}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={sendMessageAct}
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
