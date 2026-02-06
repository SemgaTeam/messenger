import { User } from "@/hooks/UseUsers";
import { UserListItem } from "./UserListItem";

type Props = {
    isOpen: boolean;
    users: User[];
    loading: boolean;
    error: string | null;
    onClose: () => void;
    onSelect: (user: User) => void;
};

export function UsersModal(
    {
        isOpen,
        users,
        loading,
        error,
        onClose,
        onSelect    
    }: Props  
) {
    if (! isOpen) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-blue p-4 rounded min-w-[300px] grid gap-3">
                <p>Chat with: </p>

                {loading && <p>Loading...</p>}
                {error && <p className="text-red-600">{error}</p>}

                {users.map(user => (
                    <UserListItem
                         key={user.id}
                         user={user}
                         onClick={() => onSelect(user)}
                    />
                ))}|

            </div>
        </div>
    )
}
