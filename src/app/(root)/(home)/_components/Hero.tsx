"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <main className="h-[80vh] flex-center w-full bg-heroImage bg-cover">
      <motion.div
        className="flex-center flex-col"
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="font-bold text-[50px] text-white max-sm:text-[35px]">Collection is here</h1>
        <p className="text-[18px] text-white w-[750px] text-center max-sm:text-[14px] max-sm:px-5 max-sm:w-[100%]">
          The time is now for it to be okay to be great. People in this world
          shun people for being great. For being a bright color. For standing
          out.
        </p>
        <motion.button
          className="py-2 px-4 border rounded-md mt-7 bg-secondary-gray bg-opacity-45 border-opacity-20 text-white hover:bg-secondary-gray hover:bg-opacity-70 hover:text-white"
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Explore
        </motion.button>
      </motion.div>
    </main>
  );
};

export default Hero;
