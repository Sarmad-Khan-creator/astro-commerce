import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import Sidebar from "@/app/(root)/store/_components/Sidebar";

const MobileSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="bg-transparent">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
