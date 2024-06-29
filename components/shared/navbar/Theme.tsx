"use client";
import { useTheme } from "@/context/ThemeProvider";
import React from "react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import { themes } from "@/constants";

const Theme = () => {
  const { mode, setMode } = useTheme();
  return (
    <Menubar className="border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger
          className="focus:bg-light-900 data-[state=open]:bg-light-900
            dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200
        "
        >
          {mode === "light" ? (
            <Image
              src="/assets/icons/sun.svg"
              alt="light"
              width={20}
              height={20}
              className="active-theme"
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              alt="dark"
              width={15}
              height={15}
              className="active-theme"
            />
          )}
        </MenubarTrigger>
        <MenubarContent
          className="absolute -right-12 
        flex h-[116px] min-w-[120px] shrink flex-col 
        justify-center justify-items-center rounded
        border px-2 pt-2 dark:bg-dark-300"
        >
          {themes.map((item) => (
            <MenubarItem
              key={item.label}
              className={` 
              flex items-center gap-2 focus:bg-light-800`}
              onClick={() => {
                console.log("Value of theme", item.value);
                setMode(item.value);
                if (item.value !== "system") {
                  localStorage.setItem("theme", item.value);
                } else {
                  localStorage.removeItem("theme");
                }
              }}
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={20}
                height={20}
                className={`${item.value === mode ? "active-theme" : ""}`}
              />
              <p
                className={`text-[14px] font-semibold text-light-500 ${item.value === mode ? "active-theme" : ""}`}
              >
                {item.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
