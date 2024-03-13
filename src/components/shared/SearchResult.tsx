"use client";
import { getSearchProducts } from "@/lib/actions/product.action";
import { IProduct } from "@/models/product.model";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchResult = ({ onClick }: { onClick: () => void }) => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[] | null>([]);

  const search = searchParams.get("search");

  useEffect(() => {
    const getProducts = async () => {
      setProducts([]);
      setIsLoading(true);

      try {
        const products = await getSearchProducts(search as string);
        setProducts(products);
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    if (search) {
      getProducts();
    }
  }, [search]);
  return (
    <div className="w-full flex flex-col gap-2 absolute top-[40px] bg-primary-dark px-1">
      {isLoading ? (
        <div className="w-full flex-center py-2">
          <Loader className="text-white" size={25} />
        </div>
      ) : products?.length === 0 ? (
        <p className="text-white text-xs py-2 text-center">No Product found</p>
      ) : (
        products?.map((product) => (
          <Link
            key={product._id}
            href={`/product/${product._id}`}
            onClick={onClick}
          >
            <div className="w-full flex items-center justify-between text-white hover:bg-gray-500 hover:cursor-pointer p-3 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="relative w-[25px] h-[35px]">
                  <Image src={product.images[0]} alt="product image" fill />
                </div>
                <p className="text-xs line-clamp-1">{product.title}</p>
              </div>
              <p className="text-xs">Rs.{product.originalPrice}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default SearchResult;
