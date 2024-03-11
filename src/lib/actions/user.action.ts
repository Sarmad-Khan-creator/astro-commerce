"use server";
import { connectToDatabase } from "@/database/database";
import User from "@/models/user.model";
import {
  CreateUserProps,
  DeletUserProps,
  GetWishlistedProductProps,
  UpdateUserProps,
  WishlistedProductProps,
} from "./shared";
import { revalidatePath } from "next/cache";
import Wishlist from "@/models/wishlist.model";

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
    await connectToDatabase();
    const deletedUser = await User.findOneAndDelete({ clerkId });

    return deletedUser;
  } catch (error) {
    throw error;
  }
};

export const findUserByClerkId = async ({
  clerkId,
}: {
  clerkId: string | null;
}) => {
  await connectToDatabase();
  try {
    const user = await User.findOne({ clerkId: clerkId });

    return user;
  } catch (error) {
    throw error;
  }
};

export const getWishlistedProduct = async ({
  userId,
  productId,
}: GetWishlistedProductProps) => {
  try {
    await connectToDatabase();

    const wishlistedProduct = await Wishlist.findOne({
      user: userId,
      product: productId,
    });

    return JSON.stringify(wishlistedProduct);
  } catch (error) {
    throw error;
  }
};

export const addToWishlistProduct = async ({
  userId,
  productId,
  path,
}: WishlistedProductProps) => {
  try {
    await connectToDatabase();
    await Wishlist.create({
      user: userId,
      product: productId,
    });
    if (typeof path === "string") {
      revalidatePath(path);
    }
  } catch (error) {
    throw error;
  }
};

export const removeFromWishlistProduct = async ({
  userId,
  productId,
  path,
}: WishlistedProductProps) => {
  try {
    await connectToDatabase();
    await Wishlist.deleteOne({
      user: userId,
      product: productId,
    });

    if (typeof path === "string") {
      revalidatePath(path);
    }
  } catch (error) {
    throw error;
  }
};

export const getAllWishlistedProducts = async (userId: string) => {
  try {
    await connectToDatabase();

    const products = await Wishlist.find({
      user: userId,
    }).populate("product");

    return products;
  } catch (error) {
    throw error;
  }
};
