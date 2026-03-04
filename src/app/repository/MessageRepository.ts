import { FullMessage } from "@/types/types";


export interface MessageRepository {
    create: (message: CreateMessageDTO) => Promise<FullMessage | null>;
    findAllByChatId: (chatId: string) => Promise<FullMessage[]>;
    findAllBySenderId: (userId: string) => Promise<FullMessage[]>;
    update: (message: UpdateMessageDTO) => Promise<FullMessage | null>;
    deleteById: (id: string) => Promise<FullMessage>;
}