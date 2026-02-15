import { Chat } from "@/types/types";

export async function getChat(
  user1_id: string,
  user2_id: string,
): Promise<Chat> {
  try {
    const res = await fetch("api/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user1_id, user2_id }),
    });

    if (!res.ok) {
      throw new Error("ChatAlready exist or database error; " + res.text);
    }

    const data = await res.json();
    return data;
  } catch (err: any) {
    throw err;
  }
}
