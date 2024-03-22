import { Button } from "@/components/ui/button";
import { CategoryItems } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductFeatures from "./ProductFeatures";

const ShopByCategory = () => {
  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-center flex-col gap-1">
        <h2 className="text-primary-dark font-notoSans text-3xl font-semibold">
          Shop By Category
        </h2>
        <Link href="#" className="flex items-center justify-center gap-2">
          <p className="text-[16px] text-primary-dark font-medium hover:underline">
            Browse all categories
          </p>
          <Image
            src="/icons/right-arrow.svg"
            alt="arrow right"
            width={7}
            height={7}
            className="mt-1"
          />
        </Link>
      </div>

      <div className="flex-center gap-10 max-sm:flex-col">
        {CategoryItems.map((item) => (
          <div key={item.category} className="w-[243px] h-[363px] relative">
            <Image
              src={item.image}
              alt="Category"
              fill
              className="rounded-2xl"
            />
            <div className="flex flex-col gap-3 items-center justify-center relative top-56">
              <p className="text-white text-[16px] font-semibold">
                {item.category}
              </p>
              <h2 className="text-white text-[24px] font-extrabold font-notoSans">
                {item.title}
              </h2>
              <Link
                href="#"
                className="flex-center gap-1 text-white hover:underline"
              >
                <p>See Products</p>
                <Image
                  src="/icons/right-arrow.svg"
                  alt="arrow right"
                  width={7}
                  height={7}
                  className="invert mt-1"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full h-[487px] bg-heroImage rounded-2xl bg-cover flex-center flex-col gap-10 max-sm:w-screen max-sm:rounded-none">
        <h2 className="font-bold text-[50px] font-notoSans text-white max-sm:text-[35px]">
          Basic Starter Pack
        </h2>
        <p className="text-white text-[18px] w-[700px] text-center max-sm:text-[14px] max-sm:w-[95%] max-sm:mx-20">
          The time is now for it to be okay to be great. People in this world
          shun people for being great. For being a bright color. For standing
          out.
        </p>
        <Button
          variant="outline"
          className="bg-secondary-gray bg-opacity-45 text-white hover:bg-secondary-gray hover:text-white hover:bg-opacity-70"
        >
          Explore New Collection
        </Button>
      </div>
    </div>
  );
};

export default ShopByCategory;
