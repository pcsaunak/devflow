import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";

const GlobalSearch = () => {
  return (
    <div
      className="relative flex w-full max-w-[600px] 
     max-sm:hidden"
    >
      <div
        className="background-light800_darkgradient 
      relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4"
      >
        <Image
          src="/assets/icons/search.svg"
          width={24}
          height={24}
          alt="search"
          className="cursor-pointer"
        />
        <Input
          placeholder="Search for questions here"
          className="border-none bg-transparent"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
