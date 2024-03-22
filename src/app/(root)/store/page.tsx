import ProductCard from "@/components/shared/ProductCard";
import React from "react";
import Sidebar from "./_components/Sidebar";
import { getAllProducts } from "@/lib/actions/product.action";
import { auth } from "@clerk/nextjs";
import { findUserByClerkId } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/lib/actions/shared";
import Pagination from "@/components/shared/Pagination";
import { getCartProduct } from "@/lib/actions/cart.action";
import MobileSheet from "@/components/MobileSheet";

const Store = async ({ searchParams }: SearchParamsProps) => {
  const { products, isNext } = await getAllProducts({
    category: searchParams.category,
    designer: searchParams.designer,
    material: searchParams.material,
    size: searchParams.size,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 12,
  });
  const { userId } = auth();
  const user = await findUserByClerkId({ clerkId: userId });

  return (
    <section className="px-28 py-14 max-sm:px-5 max-sm:py-3 min-h-[80vh]">
      <div className="sm:hidden">
        <MobileSheet />
      </div>
      <h1 className="font-semibold text-[30px] text-primary-dark">
        Our Products
      </h1>
      <section className="flex gap-10 mt-5">
        <div className="max-sm:hidden">
          <Sidebar />
        </div>
        <div className="flex gap-5 flex-wrap max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:w-full">
          {products.map((product) => {
            return (
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
            );
          })}
        </div>
      </section>
      <div className="mt-7">
        <Pagination
          pageNumber={searchParams.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </section>
  );
};

export default Store;
