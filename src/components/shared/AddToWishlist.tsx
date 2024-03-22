"use client"
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import {
  addToWishlistProduct,
  getWishlistedProduct,
  removeFromWishlistProduct,
} from "@/lib/actions/user.action";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { IProduct } from "@/models/product.model";

interface AddToWIshlistProps {
  userId: string;
  productId: string;
  path: string;
  wishlistedProducts: Partial<IProduct>
}

const AddToWishlist = ({ userId, productId, path, wishlistedProducts }: AddToWIshlistProps) => {
  const router = useRouter();

  const handleWishlistProduct = async () => {
    if (!userId) {
      toast({
        title: "Denied",
        description: "You need to login to perform this action",
        variant: "destructive"
      });
      return;
    }

    if (wishlistedProducts) {
      await removeFromWishlistProduct({
        userId: userId,
        productId: productId,
        path: path,
      });
      toast({
        title: "Removed",
        description: "Product removed from wishlist",
        variant: "destructive",
      });

      router.push(path, { scroll: false })
    } else {
      await addToWishlistProduct({
        userId: userId,
        productId: productId,
        path: path,
      });
      toast({
        title: "Added",
        description: "Product added to wishlist",
        variant: "success"
      });

      router.push(path, { scroll: false })
    }
  };
  return (
    <Button
      variant="default"
      className="border border-black bg-transparent hover:bg-transparent"
      onClick={handleWishlistProduct}
    >
      <HeartFilledIcon
        className={cn(wishlistedProducts ? "text-red-500" : "text-black")}
      />
    </Button>
  );
};

export default AddToWishlist;
