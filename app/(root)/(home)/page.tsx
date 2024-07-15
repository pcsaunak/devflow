/* eslint-disable no-unused-vars */
import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import LocalSearchBar from "@/components/shared/LocalSearchBar";
import NoResult from "@/components/shared/NoResult";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";

import { useTheme } from "@/context/ThemeProvider";
import { getQuestions } from "@/lib/actions/question.action";

import Link from "next/link";

import React from "react";

async function Home() {
  const questions = [
    {
      _id: "1",
      title:
        "The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this",
      tags: [
        { _id: "1", name: "Python" },
        { _id: "2", name: "SQL" },
      ],
      author: {
        _id: "1",
        name: "John Doe",
        picture: "/assets/icons/avatar.svg",
      },
      upVotes: 10,
      answers: [],
      views: 1000,
      createdAt: new Date("2024-07-04T12:00:00.000Z"),
    },
    {
      _id: "2",
      title: "This is sample question 3",
      tags: [
        { _id: "1", name: "Python" },
        { _id: "2", name: "SQL" },
      ],
      author: {
        _id: "2",
        name: "John Cena",
        picture: "/assets/icons/avatar.svg",
      },
      upVotes: 10,
      answers: [],
      views: 1000,
      createdAt: new Date("2024-07-04T12:00:00.000Z"),
    },
    {
      _id: "3",
      title: "This is anothe sample data question",
      tags: [
        { _id: "1", name: "Python" },
        { _id: "2", name: "SQL" },
      ],
      author: {
        _id: "3",
        name: "Pen Cok",
        picture: "/assets/icons/avatar.svg",
      },
      upVotes: 10,
      answers: [],
      views: 1000,
      createdAt: new Date("2024-07-02T12:00:00.000Z"),
    },
    {
      _id: "4",
      title: "This is anothe sample data question",
      tags: [
        { _id: "1", name: "Python" },
        { _id: "2", name: "SQL" },
      ],
      author: {
        _id: "1",
        name: "John Doe",
        picture: "/assets/icons/avatar.svg",
      },
      upVotes: 10,
      answers: [],
      views: 1000,
      createdAt: new Date("2024-07-04T12:00:00.000Z"),
    },
    {
      _id: "5",
      title:
        "This is anothe sample data question 6 and it will continue with it",
      tags: [
        { _id: "1", name: "Python" },
        { _id: "2", name: "SQL" },
      ],
      author: {
        _id: "4",
        name: "Sinn Lock",
        picture: "/assets/icons/avatar.svg",
      },
      upVotes: 5260045,
      answers: [],
      views: 1000,
      createdAt: new Date("2024-06-20T12:00:00.000Z"),
    },
  ];

  const result = await getQuestions({});
  console.log(result?.questions);
  return (
    <>
      <div className="flex-between flex-col-reverse gap-4 sm:flex-row sm:items-center">
        <h2 className="h1-bold text-dark100_light900">All Questions</h2>
        <Link href={`/ask-question`}>
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex flex-col justify-between gap-5 max-lg:flex-row">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeHolder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          route="/"
          filters={HomePageFilters}
          placeHolder="Select a filter"
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      {/* Creating a div where I can display all the questions */}
      <div className="mt-10 flex w-full flex-col gap-6">
        {result?.questions.length > 0 ? (
          result.questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upVotes={question.upVotes}
              answers={question.answers}
              views={question.views}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            displayMsg="There's no question to show"
            imgSrc="/assets/images/light-illustration.png"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}

export default Home;
