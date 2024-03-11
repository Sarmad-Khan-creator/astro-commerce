"use server";

import { connectToDatabase } from "@/database/database";
import Product, { IProduct } from "@/models/product.model";
import { revalidatePath } from "next/cache";
import { GetProductProps } from "./shared";
import { FilterQuery } from "mongoose";
import { ObjectId } from "mongodb";

export const createProduct = async (data: Partial<IProduct>) => {
  const {
    title,
    description,
    originalPrice,
    discountedPrice,
    inStock,
    categories,
    designers,
    materials,
    sizes,
    colors,
    images,
  } = data;

  try {
    await connectToDatabase();
    await Product.create({
      title,
      description,
      originalPrice,
      discountedPrice,
      inStock,
      categories,
      designers,
      materials,
      sizes,
      colors,
      images,
    });

    revalidatePath("/admin/dashboard");
  } catch (error) {
    throw error;
  }
};

export const getAllProducts = async ({
  category,
  designer,
  material,
  size,
}: GetProductProps) => {
  try {
    await connectToDatabase();

    // Initialize an empty query object
    let query: FilterQuery<typeof Product> = {};

    // Dynamically add filters to the query object if they are defined
    if (category) query["categories"] = category;
    if (designer) query["designers"] = designer;
    if (material) query["materials"] = material;
    if (size) query["sizes"] = size;

    // Use the query object to filter products
    const products = await Product.find(query);

    return products;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id: string, path: string) => {
  try {
    await connectToDatabase();

    await Product.findByIdAndDelete(id);

    revalidatePath(path);
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    await connectToDatabase();
    const product = await Product.findById(id);

    return product;
  } catch (error) {
    throw error;
  }
};

export const getProductRating = async (productId: string) => {
  try {
    await connectToDatabase();
    const [rating] = await Product.aggregate([
      { $match: { _id: new ObjectId(productId) } }, // Match the product by its ID
      {
        $lookup: {
          from: "ratings", // Assuming 'ratings' is the collection where ratings are stored
          localField: "rating", // Field in the products collection
          foreignField: "_id", // Field in the ratings collection that corresponds to the product's _id
          as: "productRatings", // Array containing all ratings for the product
        },
      },
      { $unwind: "$productRatings" }, // Deconstruct the array of ratings
      {
        $group: { _id: null, totalRating: { $sum: "$productRatings.rating" } },
      }, // Sum up all the ratings
      { $project: { _id: 0, totalRating: 1 } }, // Project the totalRating field
    ]);

    return rating ? rating : 0; // Return the total rating, or 0 if no ratings
  } catch (error) {
    throw error;
  }
};

export const getProductSingleRating = async (productId: string) => {
  try {
    await connectToDatabase();

    const ratingDetails = await Product.aggregate([
      { $match: { _id: new ObjectId(productId) } }, // Match the product by its ID
      { $unwind: "$rating" },
      { $project: { _id: 0, rating: 1 } },
      {
        $lookup: {
          from: "ratings",
          localField: "rating",
          foreignField: "_id",
          as: "rating",
        },
      },
      { $unwind: "$rating" }, // Deconstruct the ratings array
      {
        $group: {
          _id: "$rating.rating", // Group by rating value
          count: { $sum: 1 }, // Count occurrences of each rating value
        },
      },
      {
        $project: {
          _id: 0,
          ratingValue: "$_id", // Rename _id to ratingValue for clarity
          count: 1, // Include the count of each rating value
        },
      },
      { $sort: { ratingValue: -1 } }, // Optional: sort by rating value
    ]);

    console.log("Rating Details:", ratingDetails);

    return ratingDetails;
  } catch (error) {
    throw error;
  }
};

export const getProductReview = async (productId: string) => {
  try {
    await connectToDatabase();

    const review = await Product.aggregate([
      { $match: { _id: new ObjectId(productId) } },
      { $project: { _id: 0, rating: 1 } },
      {
        $lookup: {
          from: "ratings",
          localField: "rating",
          foreignField: "_id",
          as: "rating",
        },
      },
      { $unwind: "$rating" },
      {
        $lookup: {
          from: "users",
          localField: "rating.user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" }
    ]);

    return review
  } catch (error) {}
};

export const updateProduct = async (productId: string, data: Partial<IProduct>) => {
  try {
    await connectToDatabase()
    await Product.findByIdAndUpdate(productId, data)

    revalidatePath("/admin/dashboard")
  } catch (error) {
    throw error;
  }
}
