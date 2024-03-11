"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function Filters() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none border border-gray-400 px-4 py-2 flex items-center gap-2">
        <p>Sort By</p>
        <Image
          src="/icons/arrow-down.svg"
          alt="arrow down"
          width={15}
          height={15}
          className="invert"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>New</DropdownMenuItem>
        <DropdownMenuItem>Old</DropdownMenuItem>
        <DropdownMenuItem>Price</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
