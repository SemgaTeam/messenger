import { useCallback, useState } from "react";
export interface User {
    id: string;
    display_name: string;
    status: string;
}

export  function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadUsers = useCallback(async () => {
        if (users.length > 0) return; 

        setLoading(true);
        setError(null);

        try {
            const r = await fetch("/api/users");
            if (!r.ok) throw new Error(`Error fetching users: ${r.statusText}`);
            const data = await r.json();
            setUsers(data);
        } catch (err: any) {
            setError("Failed to load users: " + err.message);
        } finally {
            setLoading(false)
        }
    }, [users]);

    return  { users, loading, error, loadUsers };
}