import { Schema, models, model, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  originalPrice: string;
  discountedPrice: string;
  inStock: string;
  images: string[];
  categories: string[];
  designers: string;
  materials: string;
  sizes: string[];
  colors: string[];
  rating: Schema.Types.ObjectId[];
}

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  originalPrice: { type: String, required: true },
  discountedPrice: { type: String, required: true },
  inStock: String,
  images: [String],
  categories: [String],
  designers: String,
  materials: String,
  sizes: [String],
  colors: [String],
  rating: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
