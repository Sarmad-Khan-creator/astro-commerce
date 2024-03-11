"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const AdminLinks = ({
  src,
  title,
  link,
}: {
  src: string;
  title: string;
  link: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname.includes(link);
  return (
    <Link href={link}>
      <motion.div
        layoutId="sidebar-link"
        className={cn(
          "px-5 py-2 rounded-md flex-between w-[250px]",
          isActive && "bg-primary-dark text-white"
        )}
      >
        <p className="font-semibold text-[20px]">{title}</p>
        <Image
          src={src}
          alt="icon"
          width={25}
          height={25}
          className={cn(isActive && "invert")}
        />
      </motion.div>
    </Link>
  );
};

export default AdminLinks;
