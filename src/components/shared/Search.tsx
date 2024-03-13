"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fascinate_Inline } from "next/font/google";
import SearchResult from "./SearchResult";

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchContainerRef = useRef(null);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    setIsOpen(false);

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [pathname]);

  useEffect(() => {
    const searchProduct = () => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "search",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["search"],
        });

        router.push(newUrl, { scroll: false });
      }
    };

    searchProduct();
  }, [search, searchParams, router]);

  const handleRemoveKeys = () => {
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ["search"],
    });

    setTimeout(() => {
      setSearch("");
      setIsOpen(false);
    }, 1000);
  };
  return (
    <div className="relative" ref={searchContainerRef}>
      <div className="rounded-md px-2 flex items-center bg-secondary-gray bg-opacity-10">
        <Image src="/icons/search.svg" alt="search" width={20} height={20} />
        <Input
          type="text"
          placeholder="Search"
          className="text-secondary-gray border-none focus-visible:ring-0"
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
            if (e.target.value === "" && isOpen) setIsOpen(false);
          }}
          value={search}
        />
      </div>
      {isOpen && <SearchResult onClick={handleRemoveKeys} />}
    </div>
  );
};

export default Search;
