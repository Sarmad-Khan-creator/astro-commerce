import ProductCard from "@/components/shared/ProductCard";
import {
  findUserByClerkId,
  getAllWishlistedProducts,
} from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Wishlist = async () => {
  const { userId: clerkId } = auth();
  const user = await findUserByClerkId({ clerkId });
  const wishlistedProducts = await getAllWishlistedProducts(user._id);
  return (
    <main className="mx-28 mt-14 min-h-[70vh] max-sm:mx-5">
      <p className="text-sm text-secondary-gray">Product / Wishlist</p>

      <section className="flex flex-wrap gap-4 mt-10 max-sm:flex-col max-sm:flex-center">
        {wishlistedProducts.map((product) => (
          <ProductCard
            key={product._id}
            category={product.product.categories[0]}
            imageUrl={product.product.images[0]}
            title={product.product.title}
            description={product.product.description}
            originalPrice={product.product.originalPrice}
            _id={product.product._id.toString()}
            userId={user && user._id.toString()}
            path="/user/wishlist"
          />
        ))}
      </section>
    </main>
  );
};

export default Wishlist;
