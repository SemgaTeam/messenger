import { User } from "@/types/types";

interface UserSelectionProps {
  users: User[];
  onSelect: (user: User) => void;
}

export default function UserSelection({ users, onSelect }: UserSelectionProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-6">Select User</h2>
      <div className="flex flex-col gap-3">
        {users.map((u) => (
          <button
            key={u.id}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            onClick={() => onSelect(u)}
          >
            {u.display_name}
          </button>
        ))}
      </div>
    </div>
  );
}
