import { findUserByClerkId } from "@/lib/actions/user.action";
import { auth, currentUser } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import CheckoutForm from "./_components/CheckoutForm";
import {
  getAllCartProducts,
  getAllProductsTotalPrice,
} from "@/lib/actions/cart.action";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Checkout = async () => {
  const { userId: clerkId } = auth();
  const user = await findUserByClerkId({ clerkId });
  const cartProducts = await getAllCartProducts(user._id);
  const { totalPrice } = await getAllProductsTotalPrice(user._id);

  return (
    <main className="pl-28 flex max-sm:pl-0 max-sm:flex-col-reverse">
      <aside className="flex flex-col flex-1 gap-10 mt-16 pr-96">
        <Link href="/user/cart">
          <ArrowLeft size={25} />
        </Link>
        <div className="w-full">
          <CheckoutForm user={user} products={JSON.parse(cartProducts)} />
        </div>
      </aside>
      <aside className="flex-1 w-full min-h-screen max-h-fit bg-primary-dark">
        <div className="flex flex-col gap-5 mt-16 mx-5">
          {JSON.parse(cartProducts).map((product: any) => (
            <>
              <div key={product._id} className="flex gap-5">
                <div className="w-[160px] h-[180px] rounded-lg bg-gray-100 flex items-center justify-center">
                  <div className="relative w-[130px] h-[150px]">
                    <Image
                      src={product.product.images[0]}
                      alt="product image"
                      fill
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-white">{product.product.title}</h3>
                  <p className="text-white text-sm">
                    Rs. {product.product.originalPrice}
                  </p>
                  <p className="text-secondary-gray text-sm">
                    {product.product.materials.toUpperCase()}
                  </p>
                </div>
              </div>
              <hr />
            </>
          ))}
        </div>
        <div className="flex flex-col gap-5 mx-5 mt-14">
          <div className="flex items-center justify-between">
            <p className="text-line_gray">Subtotal</p>
            <p className="text-line_gray">Rs.{totalPrice}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-line_gray">Shipping estimate</p>
            <p className="text-line_gray">Rs.0</p>
          </div>

          <div className="flex items-center justify-between mt-14 max-sm:mt-7 max-sm:mb-5">
            <p className="font-semibold text-lg text-line_gray">Total</p>
            <p className="font-semibold text-lg text-line_gray">Rs.{totalPrice}</p>
          </div>
        </div>
      </aside>
    </main>
  );
};

export default Checkout;
