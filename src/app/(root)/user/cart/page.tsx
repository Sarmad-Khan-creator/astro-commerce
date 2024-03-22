import {
  getAllCartProducts,
  getAllProductsTotalPrice,
} from "@/lib/actions/cart.action";
import { findUserByClerkId } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";
import CartProduct from "./_components/CartProduct";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MobileCartProduct from "./_components/MobileCartProduct";

const Cart = async () => {
  const { userId: clerkId } = auth();
  const user = await findUserByClerkId({ clerkId });
  const cartProducts = await getAllCartProducts(user._id);
  const { totalPrice } = await getAllProductsTotalPrice(user._id);
  return (
    <main className="mx-28 mt-14 max-sm:mx-5">
      <p className="text-secondary-gray">Product / Cart</p>
      <section className="mt-10 flex flex-col gap-5 max-sm:hidden">
        <div className="flex items-center justify-between">
          <p className="font-semibold flex-1">Product</p>
          <p className="font-semibold flex-1">Price</p>
          <p className="font-semibold flex-1">Quantity</p>
          <p className="font-semibold flex-1">Subtotal</p>
          <p className="font-semibold flex-1">Action</p>
        </div>
        {JSON.parse(cartProducts).map((product: any) => (
          <CartProduct
            key={product._id}
            product={product.product}
            quantity={product.quantity}
          />
        ))}
      </section>

      <div className="sm:hidden mt-10">
        {JSON.parse(cartProducts).map((product: any) => (
          <MobileCartProduct
            key={product._id}
            product={product.product}
            quantity={product.quantity}
          />
        ))}
      </div>

      <div className="flex justify-end mt-10 max-sm:justify-center">
        <div className="border border-secondary-gray rounded-lg p-5 flex flex-col gap-3 w-[300px]">
          <h2 className="font-semibold text-lg">Order Summary</h2>
          <div className="flex justify-between items-center">
            <p className="text-secondary-gray text-sm font-semibold">
              Subtotal
            </p>
            <p className="text-sm text-secondary-gray font-semibold">
              Rs.{totalPrice}
            </p>
          </div>
          <hr />
          <div className="flex justify-between items-center">
            <p className="text-secondary-gray text-sm font-semibold">
              Shipping Tax
            </p>
            <p className="text-sm text-secondary-gray font-semibold">Rs.{0}</p>
          </div>
          <hr />

          <div className="flex justify-between items-center">
            <p className="text-primary-dark font-bold">Total</p>
            <p className="text-primary-dark font-bold">Rs.{totalPrice}</p>
          </div>

          <Button className="bg-primary-dark hover:bg-primary-hover">
            <Link href="/checkout">Checkout</Link>
          </Button>

          <Link
            href="/store"
            className="py-2 border border-secondary-gray text-xs font-semibold text-center"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Cart;
