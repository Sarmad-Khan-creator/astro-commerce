import { adminLinks } from "@/constants/constants";
import React from "react";
import AdminLinks from "./AdminLinks";

const AdminSidebar = () => {
  return (
    <div className="flex flex-col gap-5 p-5">
      {adminLinks.map((link) => (
        <AdminLinks
          key={link.link}
          link={link.link}
          title={link.title}
          src={link.icon}
        />
      ))}
    </div>
  );
};

export default AdminSidebar;
