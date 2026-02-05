import useUsers from "@/hooks/UseUsers";
import { useState } from "react";
import { useEffect } from "react";
import { User } from "@/hooks/UseUsers";
import { getChat } from "@/app/service/ChatService";
import { assert } from "console";

export default function ShowUsersButton({ cur_user }: {cur_user: User}) {
    const [ users, setUsers ] = useState([]);

    const act = async () => {
        {users}
    }
    const f = (): void => { 
        if (users.length == 0) {
        fetch("api/users").then(r => r.json()).then(setUsers)
    } else {
        setUsers([])
    }
    }



    return (
    <div className="grid">
        <button  className="p-2 rounded cursor-pointer transition bg-blue-500 font-semibold hover:bg-gray-700"onClick={f}>Show users</button>
        {users.map((user: User) => (
                <button key={user.id} onClick={() => {getChat(cur_user.id, user.id);
                }} className="p-2 rounded cursor-pointer transition bg-blue-500 font-semibold hover:bg-gray-700">{user.display_name}</button>
        )
        )}
    </div>
    )

}