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

interface AddToWIshlistProps {
  userId: string;
  productId: string;
  path: string;
}

const AddToWishlist = ({ userId, productId, path }: AddToWIshlistProps) => {
  const [wishlistedProduct, setWishlistedProduct] = useState({});
  const router = useRouter()

  useEffect(() => {
    const WishlistedProduct = async () => {
      const product = await getWishlistedProduct({
        userId: userId,
        productId: productId,
      });

      setWishlistedProduct(JSON.parse(product));
    };

    WishlistedProduct();
  }, [userId, productId]);

  const handleWishlistProduct = async () => {
    if (!userId) {
      toast({
        title: "Denied",
        description: "You need to login to perform this action",
        variant: "destructive"
      });
      return;
    }

    if (wishlistedProduct) {
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
        className={cn(wishlistedProduct ? "text-red-500" : "text-black")}
      />
    </Button>
  );
};

export default AddToWishlist;
