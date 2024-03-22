import { footerLinks } from "@/constants/constants";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-6 py-3 h-12 flex-between mx-24 max-sm:mx-5">
      <p className="text-secondary-gray text-[12px] max-sm:text-[8px]">
        Copyright © 2023 Corporate UI Design System by Creative Tim.
      </p>
      <div className="flex items-center gap-4">
        {footerLinks.map((item) => (
          <Link
            href={item.link}
            key={item.title}
            className="text-secondary-gray"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
