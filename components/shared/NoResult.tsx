import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const NoResult = ({
  imgSrc,
  displayMsg,
  description,
  link,
  linkTitle,
}: {
  imgSrc: string;
  displayMsg: string;
  description: string;
  link: string;
  linkTitle: string;
}) => {
  return (
    <div
      className="mt-28 flex w-full flex-col 
    items-center justify-center gap-5"
    >
      <Image
        src={imgSrc}
        width={270}
        height={200}
        alt="search"
        className="block object-contain dark:hidden"
      />

      <Image
        src="/assets/images/dark-illustration.png"
        width={270}
        height={200}
        alt="search"
        className="hidden object-contain dark:flex"
      />
      <h1 className="h3-bold text-dark200_light900">{displayMsg}</h1>
      <p className="body-regular text-dark500_light700 max-w-md text-center">
        {description}
      </p>
      <Link href={link}>
        <Button className="primary-gradient px-4 py-3 text-light-900 hover:bg-primary-500 dark:text-light-900">
          {linkTitle}
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;
