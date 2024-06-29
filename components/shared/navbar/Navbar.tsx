import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./Theme";
import MobileNav from "./MobileNav";
import GlobalSearch from "./GlobalSearch";
import { UserButton, SignedIn } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav
      className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 
      p-6 shadow-light-300 dark:shadow-none sm:px-12"
    >
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          width={23}
          height={23}
          alt="devflow"
        />
        <p className="text-dark100_light900 font-spaceGrotesk text-[24px] font-bold max-sm:hidden">
          Dev
          <span className="text-primary-500"> Flow</span>
        </p>
      </Link>

      <GlobalSearch />

      <div className="flex-between">
        <Theme />
        <MobileNav />
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
