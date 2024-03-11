import { StarFilledIcon } from "@radix-ui/react-icons";
import { Star } from "lucide-react";
import React from "react";

interface RatingProps {
  value: string;
  percent: number;
}

const SingleRating = ({ value, percent }: RatingProps) => {
  return (
    <div className="flex gap-2 items-center">
      <p className="text-sm text-secondary-gray">{value}</p>
      {percent === 0 ? <Star className="text-yellow-600" /> : <StarFilledIcon className="text-yellow-600" />}
      <div className="h-2 w-[250px]">
        <div className={`h-full bg-yellow-600`} style={{
          width: `${percent}%`
        }} />
      </div>
      <p className="text-secondary-gray text-sm">{percent}%</p>
    </div>
  );
};

export default SingleRating;
