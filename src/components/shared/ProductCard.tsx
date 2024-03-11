"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { HeartIcon } from "lucide-react";
import Link from "next/link";
import {
  addToWishlistProduct,
  getWishlistedProduct,
  removeFromWishlistProduct,
} from "@/lib/actions/user.action";
import { IUser } from "@/models/user.model";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import { revalidatePath } from "next/cache";
import AddToWishlist from "./AddToWishlist";
import AddToCart from "./AddToCart";

interface Props {
  category: string;
  imageUrl: string;
  title: string;
  description: string;
  originalPrice: string;
  _id?: string;
  userId: string;
  path?: string;
}

const variant = {
  initial: { opacity: 1 },
  buttonAnimate: { opacity: 0, y: 0 },
};

const ProductCard = ({
  category,
  imageUrl,
  title,
  description,
  originalPrice,
  _id,
  userId,
  path,
}: Props) => {
  const [variants, setVariants] = useState(variant);

  const handleMouseEnter = () => {
    setVariants({
      initial: { opacity: 0 },
      buttonAnimate: { opacity: 1, y: 0 },
    });
  };

  const handleMouseLeave = () => {
    setVariants({
      initial: { opacity: 1 },
      buttonAnimate: { opacity: 0, y: 50 },
    });
  };

  return (
    <motion.div
      className="p-5 rounded-lg w-[250px] h-fit flex flex-col gap-2 border border-gray-300 relative"
      variants={variants}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/product/${_id}`}>
        <div className="flex-center w-full">
          <div className="flex-center w-[170px] h-[224px] relative">
            <Image src={imageUrl} alt="Suit" fill />
          </div>
        </div>
        <p className="text-secondary-gray text-[16px] font-semibold">
          {category.toUpperCase()}
        </p>
        <h2 className="font-semibold text-[20px] text-primary-dark line-clamp-1">{title}</h2>
        <motion.p
          variants={variants}
          animate="initial"
          className="text-secondary-gray text-[16px] leading-5 line-clamp-3"
        >
          {description}
        </motion.p>
        <motion.div
          variants={variants}
          animate="initial"
          className="flex items-center gap-2 mt-2"
        >
          <div className="bg-blue-500 rounded-md h-4 w-4" />
          <div className="bg-blue-500 rounded-md h-4 w-4" />
        </motion.div>
        <motion.p
          variants={variants}
          animate="initial"
          className="font-semibold text-[24px] text-primary-dark"
        >
          Rs. {originalPrice}
        </motion.p>
      </Link>

      <motion.div
        variants={variants}
        animate="buttonAnimate"
        className="flex flex-row items-center gap-2 mx-2 w-full absolute bottom-[50px]"
      >
        <AddToCart
          userId={userId}
          productId={_id as string}
          path={path as string}
        />
        <AddToWishlist
          userId={userId}
          productId={_id as string}
          path={path as string}
        />
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
