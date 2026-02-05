

export async function getChat(user1_id: string, user2_id: string) {
    fetch("api/chats", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user1_id, user2_id}),
    })

}