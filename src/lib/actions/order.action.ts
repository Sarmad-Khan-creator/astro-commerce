"use server";

import { connectToDatabase } from "@/database/database";
import Cart from "@/models/cart.model";
import Order, { IOrder } from "@/models/order.model";

export const placeOrder = async (data: IOrder, userId: string) => {
  try {
    await connectToDatabase();
    const order = await Order.create({
        product: data.product,
        user: data.user,
        quantity: data.quantity,
        name: data.name,
        email: data.email,
        address: data.address
    });

    await Cart.deleteMany({
        user: userId
    })
  } catch (error) {
    throw error;
  }
};
