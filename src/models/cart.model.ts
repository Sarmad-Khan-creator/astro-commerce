import { Schema, models, model, Document } from "mongoose";

export interface ICart extends Document {
    user: Schema.Types.ObjectId;
    product: Schema.Types.ObjectId
    quantity: number
}

const CartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, default: 1 }
})

const Cart = models.Cart || model("Cart", CartSchema);

export default Cart;