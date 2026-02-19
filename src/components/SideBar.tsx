import { Chat, UseModalReturn, User, UseUsersReturn } from "@/types/types";
import ShowUsersButton from "@/components/ShowUsersModalButton";
import { UsersModal } from "@/components/UsersModal";

import { getChat } from "@/app/service/ChatService";

interface SidebarProps {
  currentUser: User;
  chats: Chat[];
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat) => void;
  modal: UseModalReturn;
  users: UseUsersReturn;
  openModal: () => void;
  setChats: (chats: Chat[]) => void;
}

export default function Sidebar({
  currentUser,
  chats,
  selectedChat,
  setSelectedChat,
  modal,
  users,
  openModal,
  setChats,
}: SidebarProps) {
  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col p-4">
      <ShowUsersButton onClick={openModal} />
      <UsersModal
        isOpen={modal.isOpen}
        users={users.users}
        loading={users.loading}
        error={users.error}
        onClose={modal.close}
        onSelect={async (user) => {
          const chat = await getChat(currentUser.id, user.id);
          modal.close();
          fetch("/api/chats")
            .then((r) => r.json())
            .then(setChats);
          setSelectedChat(chat);
        }}
      />

      {/* Profile */}
      <div className="mb-4 p-4 bg-gray-700 rounded shadow-sm">
        <p className="font-bold text-lg">{currentUser.display_name}</p>
        <p className="text-gray-300 text-sm">{currentUser.status}</p>
      </div>

      {/* Chats */}
      <h3 className="text-lg font-semibold mb-2">Chats</h3>
      <div className="flex flex-col gap-2 overflow-y-auto flex-1">
        {chats.map((c) => (
          <div
            key={c.id}
            className={`p-2 rounded cursor-pointer transition ${
              selectedChat?.id === c.id
                ? "bg-blue-500 font-semibold"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setSelectedChat(c)}
          >
            {c.user1 === currentUser.display_name ? c.user2 : c.user1}
          </div>
        ))}
      </div>
    </div>
  );
}
