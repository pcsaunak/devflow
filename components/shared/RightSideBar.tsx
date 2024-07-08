import { TagType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";

const RightSideBar = () => {
  const hotQuestions = [
    {
      id: 1,
      title: "How do I add express as a custom server?",
    },
    {
      id: 2,
      title: "How do I add express as a custom server?",
    },
    {
      id: 3,
      title: "How do I add express as a custom server?",
    },
    {
      id: 4,
      title: "How do I add express as a custom server?",
    },
    {
      id: 5,
      title: "How do I add express as a custom server?",
    },
  ];

  const popularTags: Array<TagType> = [
    {
      id: 1,
      title: "Javascript",
      count: 200,
    },
    {
      id: 2,
      title: "Python",
      count: 156,
    },
    {
      id: 3,
      title: "Java",
      count: 87,
    },
    {
      id: 4,
      title: "Node.js",
      count: 218,
    },
    {
      id: 5,
      title: "Mongodb",
      count: 200,
    },
    {
      id: 6,
      title: "MySql",
      count: 219,
    },
    {
      id: 7,
      title: "MongoDb",
      count: 200,
    },
    {
      id: 8,
      title: "Javascript",
      count: 200,
    },
  ];
  return (
    <section
      className="background-light900_dark200 light-border 
      sticky right-0 top-0 flex h-screen w-[350px]
    flex-col overflow-y-auto border-r p-6 pt-36
      shadow-light-300 dark:shadow-none
      max-xl:hidden"
    >
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-7">
          {hotQuestions.map((question) => {
            return (
              <Link
                key={question.id}
                href={`/questions/${question.id}`}
                className="flex cursor-pointer justify-between gap-7"
              >
                <p className="body-medium text-dark500_light700">
                  {question.title}
                </p>
                <Image
                  src="/assets/icons/chevron-right.svg"
                  width={20}
                  height={20}
                  alt="details"
                  className="invert-colors"
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular tags</h3>
        <div className="flex flex-col gap-4">
          {popularTags.map((item) => (
            <RenderTag
              showCount={true}
              count={item.count}
              id={item.id}
              title={item.title}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
