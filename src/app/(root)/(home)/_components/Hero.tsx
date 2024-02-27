import { Button } from "@/components/ui/button";
import React from "react";

const Hero = () => {
  return (
    <main className="h-[80vh] flex-center flex-col w-full bg-heroImage bg-cover">
      <h1 className="font-bold text-[50px] text-white">Collection is here</h1>
      <p className="text-[18px] text-white w-[750px] text-center">
        The time is now for it to be okay to be great. People in this world shun
        people for being great. For being a bright color. For standing out.
      </p>
      <Button
        variant="outline"
        className="mt-10 bg-white bg-opacity-45 border-opacity-20 text-white hover:bg-secondary-gray hover:bg-opacity-70 hover:text-white"
      >
        Explore
      </Button>
    </main>
  );
};

export default Hero;
