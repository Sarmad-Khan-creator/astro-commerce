"use client";

import { changeImagePosition } from "@/lib/actions/product.action";
import { IProduct } from "@/models/product.model";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

interface Props {
  product: Partial<IProduct>;
}

const ImageSelection = ({ product }: Props) => {
  const handleImageSelection = async (position: number) => {
    try {
      await changeImagePosition(product._id, position);
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="flex flex-col gap-5 max-sm:flex-row">
      {product.images?.map((image: string, index: number) => (
        <motion.div
          key={image}
          className="relative w-[90px] h-[110px] cursor-pointer"
          whileHover={{ scale: 1.2 }}
          onClick={() => handleImageSelection(index)}
        >
          <Image src={image} alt="product image" fill />
        </motion.div>
      ))}
    </div>
  );
};

export default ImageSelection;
