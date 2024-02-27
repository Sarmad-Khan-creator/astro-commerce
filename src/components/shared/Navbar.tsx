"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { links } from "@/constants/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Input } from "../ui/input";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="w-full px-28 py-5 bg-primary-dark flex-between">
      <div className="flex items-center gap-2">
        {links.map((link) => {
          const isActive = pathname.includes(link.url);

          return (
            <Link href="#" key={link.title}>
              <Button
                className={cn(isActive ? "bg-gray-300" : "bg-transparent")}
              >
                {link.title}
              </Button>
            </Link>
          );
        })}
      </div>

      <div className="rounded-md px-2 flex items-center bg-secondary-gray bg-opacity-10">
        <Image src="/icons/search.svg" alt="search" width={20} height={20} />
        <Input
          type="text"
          placeholder="Search"
          className="text-secondary-gray border-none focus-visible:ring-0"
        />
      </div>
    </nav>
  );
};

export default Navbar;
