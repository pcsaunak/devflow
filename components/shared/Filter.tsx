"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomFilterPropsType {
  route: string;
  filters: { name: string; value: string }[];
  placeHolder?: string;
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({
  route,
  filters,
  placeHolder,
  otherClasses,
  containerClasses,
}: CustomFilterPropsType) => {
  return (
    <div className={`relative ${containerClasses}`}>
      <Select>
        <SelectTrigger
          className={`background-light800_darkgradient 
      body-regular light-border text-dark500_light700 
      border px-5 py-2.5 ${otherClasses}`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder={placeHolder} />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem value={item.value} key={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
