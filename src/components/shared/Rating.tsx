"use client";
import { getProductRating } from "@/lib/actions/product.action";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { StarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const rating = [1, 2, 3, 4, 5];

interface Props {
  ratingValue: number;
}

const Rating = ({ ratingValue }: Props) => {
  return (
    <div className="flex gap-1">
      {rating.map((rat) =>
        ratingValue >= rat ? (
          <StarFilledIcon key={rat} className="text-yellow-600 w-[25px] h-[25px]" />
        ) : (
          <StarIcon key={rat} className="text-yellow-600 w-[25px] h-[25px]" />
        )
      )}
    </div>
  );
};

export default Rating;
