import { connectToDatabase } from "@/database/database";
import User from "@/models/user.model";
import { CreateUserProps, DeletUserProps, UpdateUserProps } from "./shared";
import { revalidatePath } from "next/cache";

export const createUser = async (data: CreateUserProps) => {
  const { clerkId, name, email, picture, username } = data;

  try {
    await connectToDatabase();
    const user = await User.create({
      clerkId,
      name,
      email,
      picture,
      username,
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (data: UpdateUserProps) => {
  const { clerkId, updateData, path } = data;

  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate(
      {
        clerkId,
      },
      updateData,
      {
        new: true,
      }
    );

    revalidatePath(path);

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (data: DeletUserProps) => {
  const { clerkId } = data;

  try {
    const user = await User.findOneAndDelete({ clerkId });

    const deletedUser = await User.findByIdAndDelete(user._id)

    return deletedUser;
  } catch (error) {
    throw error;
  }
};
