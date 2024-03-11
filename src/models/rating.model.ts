import { Schema, models, model, Document } from "mongoose";

export interface IRating extends Document {
  user: Schema.Types.ObjectId;
  rating: number;
  review: string;
}

const RatingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, default: 0 },
    review: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Rating = models.Rating || model("Rating", RatingSchema);

export default Rating;
