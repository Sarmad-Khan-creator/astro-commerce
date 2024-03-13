"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { links } from "@/constants/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Input } from "../ui/input";
import Search from "./Search";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="w-full px-28 py-5 bg-primary-dark flex-between">
      <div className="flex items-center gap-2">
        {links.map((link) => {
          const isActive = pathname.includes(link.url);

          return (
            <Link href={link.url} key={link.title}>
              <Button
                className={cn(
                  isActive
                    ? "bg-secondary-gray bg-opacity-45 hover:bg-secondary-gray hover:bg-opacity-70"
                    : "bg-transparent hover:bg-secondary-gray hover:bg-opacity-70"
                )}
              >
                {link.title}
              </Button>
            </Link>
          );
        })}
      </div>

      <Search />
    </nav>
  );
};

export default Navbar;
