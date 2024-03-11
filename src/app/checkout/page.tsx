import { findUserByClerkId } from "@/lib/actions/user.action";
import { CheckoutFormSchema } from "@/lib/validation";
import { auth, currentUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CheckoutForm from "./_components/CheckoutForm";
import { getAllCartProducts } from "@/lib/actions/cart.action";
import { IProduct } from "@/models/product.model";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Checkout = async () => {
  const { userId: clerkId } = auth();
  const user = await findUserByClerkId({ clerkId });
  const cartProducts = await getAllCartProducts(user._id);

  return (
    <main className="pl-28 flex">
      <aside className="flex flex-col flex-1 gap-10 mt-16 pr-96">
        <Link href="/user/cart">
          <ArrowLeft size={25} />
        </Link>
        <div className="w-full">
          <CheckoutForm user={user} />
        </div>
      </aside>
      <aside className="flex-1 w-full h-screen bg-primary-dark">
        <div className="flex flex-col gap-5 mt-16 ml-5">
          {JSON.parse(cartProducts).map((product: any) => (
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
                <Button className="bg-white bg-opacity-20 border border-white border-opacity-45 hover:bg-white hover:bg-opacity-40">
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </main>
  );
};

export default Checkout;
