"use client";
import React from "react";
import { Input } from "../ui/input";
import Image from "next/image";

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeHolder: string;
  otherClasses?: string;
}

const LocalSearchBar = ({
  route,
  iconPosition,
  imgSrc,
  placeHolder,
  otherClasses,
}: CustomInputProps) => {
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow 
        items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt="search"
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        placeholder={placeHolder}
        value=""
        onChange={() => {}}
        className="no-focus
        background-light800_darkgradient
        border-none shadow-none outline-none"
      ></Input>

      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt="search"
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchBar;
