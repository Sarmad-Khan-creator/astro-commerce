"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import {
  addToCart,
  getCartProduct,
  removeFromCart,
} from "@/lib/actions/cart.action";

interface AddToCartProps {
  userId: string;
  productId: string;
  path: string;
}

const AddToCart = ({ userId, productId, path }: AddToCartProps) => {
  const [inCartProduct, setInCartProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      const product = await getCartProduct({ userId, productId });

      setInCartProduct(product);
    };

    getProduct();
  }, [userId, productId]);
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

      if (inCartProduct) {
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
      {inCartProduct ? "Remove From Cart" : "Add To Cart"}
    </Button>
  );
};

export default AddToCart;
