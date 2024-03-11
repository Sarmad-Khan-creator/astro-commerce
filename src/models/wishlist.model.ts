import { Schema, models, model, Document } from "mongoose";

export interface IWishlist extends Document {
    user: Schema.Types.ObjectId;
    product: Schema.Types.ObjectId
}

const WishlistSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    product: { type: Schema.Types.ObjectId, ref: "Product" }
})

const Wishlist = models.Wishlist || model("Wishlist", WishlistSchema);

export default Wishlist;