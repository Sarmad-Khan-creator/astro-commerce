"use server";
import { connectToDatabase } from "@/database/database";
import Product from "@/models/product.model";
import Rating from "@/models/rating.model";
import { revalidatePath } from "next/cache";

interface CreateRatingProps {
  productId: string;
  userId: string;
  review: string;
  rating: number;
}
export const createRating = async ({
  productId,
  userId,
  review,
  rating,
}: CreateRatingProps) => {
  try {
    await connectToDatabase();

    const productRating = await Rating.create({
      user: userId,
      rating: rating,
      review: review,
    });

    const product = await Product.findByIdAndUpdate(productId, {
      $push: { rating: productRating._id },
    });

    revalidatePath(`/product/${productId}`)

    return product;
  } catch (error) {
    throw error;
  }
};
