"use client";

import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

interface PaginationProps {
  pageNumber: number;
  isNext: boolean;
}

const Pagination = ({ pageNumber, isNext }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl);
  };

  if (!isNext && pageNumber === 1) return null;

  return (
    <div className="flex items-center justify-center w-full gap-3">
      <Button
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("prev")}
        className="p-3 rounded-md bg-primary-dark hover:bg-primary-hover"
      >
        Prev
      </Button>
      <p className="text-sm text-primary-dark">{pageNumber}</p>
      <Button
        disabled={!isNext}
        onClick={() => handleNavigation("next")}
        className="p-3 rounded-md bg-primary-dark hover:bg-primary-hover"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
