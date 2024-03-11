import React from "react";
import AdminSidebar from "./_components/AdminSidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <header className="px-24 py-5 flex-between bg-primary-dark">
        <h1 className="text-yellow-100 font-semibold text-[24px]">
          Admin Dashboard
        </h1>
      </header>
      <section className="flex gap-14">
        <AdminSidebar />
        {children}
      </section>
    </main>
  );
};

export default AdminLayout;
