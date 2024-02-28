import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="w-full h-screen flex-center">{children}</main>;
};

export default AuthLayout;
