import { prismaClient } from "@/lib/prisma";
import { User } from "@/types/types";
import { PrismaClient } from "@prisma/client/extension";

export interface UserProfileRepository {
    create: () => Promise<null>;
    findById: (id: string) => Promise<User | null>;
    findAll: () => Promise<User[]>;
    update: (user: UpdateUserDTO) => Promise<User | null>
    remove: (id: string)  => Promise<null>;
}

export const UserProfileRepositoryImpl = (): UserProfileRepository => ({
    create: async () => null,
    findById: async (id: string) => {
        const user =  await prismaClient.user_profiles.findFirst({
            where: {id: id}
        });

        return user;
    },

    findAll: async () => {
        return await prismaClient.user_profiles.findMany();
    }
    update: async (user: UpdateUserDTO) => {

    }
    remove: async (id: string) => {
        return await prismaClient.user_profiles.delete({
            where: {id: id}
        });
    }
});
