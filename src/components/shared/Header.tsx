import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <>
      <header className="bg-primary-dark px-28 py-5 w-full flex-between">
        <h1 className="h1-bold text-white">Astro Commerce</h1>
        <div className="flex gap-6 items-center">
          <Link href="#">
            <Image src="/icons/cart.svg" alt="cart" width={24} height={24} />
          </Link>
          <Link href="#">
            <Image src="/icons/heart.svg" alt="heart" width={24} height={24} />
          </Link>
          <Link href="#">
            <div className="flex items-center gap-2">
              <Image
                src="/icons/euro.svg"
                alt="Euro sign"
                width={24}
                height={24}
              />
              <Image
                src="/icons/arrow-down.svg"
                alt="arrow down"
                width={16}
                height={16}
              />
            </div>
          </Link>
        </div>
      </header>
      <hr className="border border-gray-500" />
    </>
  );
};

export default Header;
