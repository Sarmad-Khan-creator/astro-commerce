"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import {
  addToCart,
  removeFromCart,
} from "@/lib/actions/cart.action";
import { IProduct } from "@/models/product.model";

interface AddToCartProps {
  userId: string;
  productId: string;
  path: string;
  inCartProducts: Partial<IProduct>
}

const AddToCart = ({ userId, productId, path, inCartProducts }: AddToCartProps) => {
  
  const handleCart = async () => {
    try {
      if (!userId) {
        toast({
          title: "Denied",
          description: "You need to login to perform this action",
          variant: "destructive"
        });

        return;
      }

      if (inCartProducts) {
        await removeFromCart({ userId, productId, path });
        toast({
          title: "Removed",
          description: "Product removed from cart",
          variant: "destructive",
        });
      } else {
        await addToCart({ userId, productId, path });

        toast({
          title: "Successful",
          description: "Product added to cart",
          variant: "success"
        });
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <Button onClick={handleCart}>
      {inCartProducts ? "Remove From Cart" : "Add To Cart"}
    </Button>
  );
};

export default AddToCart;
