import { Schema, models, model, Document } from "mongoose";

export interface IOrder extends Document {
    product: Schema.Types.ObjectId[];
    user?: Schema.Types.ObjectId;
    quantity: number;
    name: string;
    email: string;
    address: string
}

const OrderSchema = new Schema({
    product: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    user: { type: Schema.Types.ObjectId, ref: "User" },
    quantity: { type: Number, default: 1 },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true }
})

const Order = models.Order || model("Order", OrderSchema);

export default Order;