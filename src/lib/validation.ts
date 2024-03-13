import { z } from "zod";

export const ProductEntryFormSchema = z.object({
  title: z.string(),
  description: z
    .string()
    .min(20, { message: "Description should be at least 20 characters" }),
  originalPrice: z.string(),
  discountedPrice: z.string(),
  stock: z.string(),
  images: z.array(z.string()).min(1, { message: "Select one image" }),
  categories: z.array(z.string()).min(1, { message: "Select one category" }),
  designers: z.string().min(1, { message: "Select one designer" }),
  materials: z.string().min(1, { message: "Select one material" }),
  sizes: z.array(z.string()).min(1, { message: "Select one size" }),
  colors: z.array(z.string()).min(1, { message: "Select one color" }),
});

export const ReviewFormSchema = z.object({
  review: z
    .string()
    .min(20, { message: "Review should be greater than 20 characters" }),
  rating: z.number(),
});

export const CheckoutFormSchema = z.object({
  email: z.string().email().describe("Email"),
  nameOnCard: z.string().describe("Name on Card"),
  cardNumber: z.string().describe("Card Number"),
  expiryDate: z.string().describe("Expiration Date"),
  cvc: z.string().describe("CVC"),
  address: z.string().describe("Address"),
});
