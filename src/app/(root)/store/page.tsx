import ProductCard from "@/components/shared/ProductCard";
import React from "react";
import Filters from "./_components/Filters";
import Sidebar from "./_components/Sidebar";
import { getAllProducts } from "@/lib/actions/product.action";
import { auth } from "@clerk/nextjs";
import { findUserByClerkId } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/lib/actions/shared";

const Store = async ({ searchParams }: SearchParamsProps) => {

  const products = await getAllProducts({
    category: searchParams.category,
    designer: searchParams.designer,
    material: searchParams.material,
    size: searchParams.size,
  });
  const { userId } = auth();
  const userData = await findUserByClerkId({ clerkId: userId });
  const user = userData;

  return (
    <section className="px-28 py-14">
      <div className="flex-between">
        <h1 className="font-semibold text-[30px] text-primary-dark">
          Our Products
        </h1>
        <Filters />
      </div>
      <section className="flex gap-10 mt-5">
        <Sidebar />
        <div className="flex gap-5 flex-wrap">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              category={product.categories[0]}
              imageUrl={product.images[0]}
              title={product.title}
              description={product.description}
              originalPrice={product.originalPrice}
              _id={product._id.toString()}
              userId={user && user._id.toString()}
              path="/store"
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default Store;
