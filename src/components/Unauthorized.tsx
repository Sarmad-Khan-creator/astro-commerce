import Link from "next/link";
import React from "react";

const Unauthorized = () => {
  return (
    <main className="h-screen w-screen flex items-center justify-center flex-col gap-3">
      <h1 className="text-4xl font-bold text-primary-dark">401 Unauthorized</h1>
      <p className="text-xl text-primary-dark">
        You are not authorized to access this page.
      </p>
      <Link
        href={"/"}
        className="px-7 py-3 bg-primary-dark text-white hover:bg-primary-hover hover:text-white"
      >
        Go back home
      </Link>
    </main>
  );
};

export default Unauthorized;
