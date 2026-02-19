import { User } from "@/types/types";

export function UserListItem({
  user,
  onClick,
}: {
  user: User;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded cursor-pointer transition bg-blue-500 font-semibold hover:bg-gray-700"
    >
      {user.display_name}
    </button>
  );
}
