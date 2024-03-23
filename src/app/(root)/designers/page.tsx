import { designers } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Designers = () => {
  return (
    <main className="min-h-screen flex flex-col items-center gap-24 justify-start mt-10">
      <h1 className="text-3xl font-semibold text-primary-dark max-sm:text-lg">
        We have some good designers in our store
      </h1>
      <div className="flex items-center gap-5 max-sm:flex-col max-sm:justify-center">
        {designers.map((designer) => (
          <Link href={`/store?designer=${designer.value}`} key={designer.value}>
            <div className="w-[200px] h-[200px] relative rounded-lg">
              <div className="relative w-full h-full">
                <Image
                  src={designer.image}
                  alt="designer"
                  fill
                  className="rounded-lg"
                />
              </div>
              <div className="w-full h-full absolute left-0 top-0 bottom-0 right-0 flex items-center justify-center">
                <p className="text-2xl font-semibold text-white">
                  {designer.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Designers;
