import { useState } from "react";

export interface User {
    id: string;
    display_name: string;
    status: string;
}

export default function useUsers(_users: User[]) {
    const [users, setUsers] = useState([]);

    const f = async function() {fetch("api/user").then(r => r.json()).then(setUsers)};
    f();
    return [users, setUsers]
};