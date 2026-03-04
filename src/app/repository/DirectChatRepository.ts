import { DirectChat } from "@/types/types";

export interface DirectChatRepository {
    create: (user1Id: string, user2Id: string) => Promise<DirectChat | null>;
    findById: (id: string) => Promise<DirectChat>;
    findByUserProfileId: (userProfileId: string) => Promise<DirectChat>;
    update: (directChat: updateDirectChatDTO) => Promise<DirectChat>;
    delete: (id: string) => Promise<DirectChat>;
}