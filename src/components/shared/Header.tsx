import { getAllCartProducts } from "@/lib/actions/cart.action";
import {
  findUserByClerkId,
  getAllWishlistedProducts,
} from "@/lib/actions/user.action";
import { SignInButton, SignedIn, SignedOut, auth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { LogInIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = async () => {
  const { userId: clerkId } = auth();
  const user = await findUserByClerkId({ clerkId });

  let allWishlistedProducts;
  let cartProducts;
  if (user) {
    allWishlistedProducts = await getAllWishlistedProducts(user._id);
    cartProducts = await getAllCartProducts(user._id);
  }
  return (
    <>
      <header className="bg-primary-dark px-28 py-5 w-full flex-between">
        <Link href={"/"}>
          <h1 className="h1-bold text-white">Astro Commerce</h1>
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/user/cart">
            <div className="relative">
              <Image src="/icons/cart.svg" alt="cart" width={24} height={24} />
              {user && (
                <div className="w-[15px] h-[15px] rounded-full text-xs flex items-center justify-center absolute text-white bg-red-500 bottom-2 left-3">
                  <p>{cartProducts && JSON.parse(cartProducts).length}</p>
                </div>
              )}
            </div>
          </Link>
          <Link href="/user/wishlist">
            <div className="relative">
              <Image
                src="/icons/heart.svg"
                alt="heart"
                width={24}
                height={24}
              />
              {user && (
                <div className="w-[15px] h-[15px] rounded-full text-xs flex items-center justify-center absolute text-white bg-red-500 bottom-2 left-3">
                  <p>{allWishlistedProducts && allWishlistedProducts.length}</p>
                </div>
              )}
            </div>
          </Link>
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "rounded-md",
                },
              }}
            />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <LogInIcon className="text-white cursor-pointer" />
            </SignInButton>
          </SignedOut>
        </div>
      </header>
      <hr className="border border-gray-500" />
    </>
  );
};

export default Header;
