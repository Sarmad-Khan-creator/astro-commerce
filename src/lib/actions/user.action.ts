import { connectToDatabase } from "@/database/database";
import User from "@/models/user.model";
import { CreateUserProps } from "@/types";

export const createUser = async (data: CreateUserProps) => {
    const { clerkId, name, email, picture, username } = data;

    try {
        await connectToDatabase();
        const user = await User.create({
            clerkId,
            name,
            email,
            picture,
            username
        })

        return user;
    } catch (error) {
        throw error;
    }
}