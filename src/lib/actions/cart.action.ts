"use server";

import { connectToDatabase } from "@/database/database";
import { CartProps, addToCartProps } from "./shared";
import Cart from "@/models/cart.model";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import Product from "@/models/product.model";

export const addToCart = async ({
  userId,
  productId,
  path,
}: addToCartProps) => {
  try {
    await connectToDatabase();

    await Cart.create({
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

export const removeFromCart = async ({
  userId,
  productId,
  path,
}: addToCartProps) => {
  try {
    await connectToDatabase();

    await Cart.deleteOne({
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

export const getCartProduct = async ({ userId, productId }: CartProps) => {
  try {
    await connectToDatabase();

    const cartProduct = await Cart.findOne({
      user: userId,
      product: productId,
    });

    return cartProduct;
  } catch (error) {
    throw error;
  }
};

export const getAllCartProducts = async (userId: string) => {
  try {
    await connectToDatabase();
    const products = await Cart.find({
      user: userId,
    }).populate({ path: "product", model: Product });

    return JSON.stringify(products);
  } catch (error) {
    throw error;
  }
};

export const updateCartProductQuantity = async (
  productId: string,
  value: number
) => {
  try {
    await connectToDatabase();
    await Cart.findOneAndUpdate(
      {
        product: productId,
      },
      { $set: { quantity: value } }
    );

    revalidatePath("/user/cart")
  } catch (error) {
    throw error;
  }
};

export const getAllProductsTotalPrice = async (userId: string) => {
  try {
    await connectToDatabase();
    const [price] = await Cart.aggregate([
      { $match: { user: new ObjectId(userId) } },
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      { $addFields: { convertedPrice: { $toInt: "$product.originalPrice" } } },
      {
        $project: {
          _id: 0,
          price: { $multiply: ["$quantity", "$convertedPrice"] },
        },
      },
      { $group: { _id: null, totalPrice: { $sum: "$price" } } },
    ]);

    if(price) {
      return price;
    } else {
      return { totalPrice: 0 }
    }
  } catch (error) {
    throw error;
  }
};
