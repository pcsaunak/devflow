import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatDateAgo, formatNumber } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface QuestionDetailsParams {
  params: {
    id: string;
  };
}

const QuestionDetails = async ({ params }: QuestionDetailsParams) => {
  const result = await getQuestionById({ questionId: params.id });
  console.log("Question Id", result._id);

  const { userId } = auth();

  console.log("User Id in Question Details Page", userId);
  let mongoUser;

  if (userId) {
    mongoUser = await getUserById({ userId });
  }

  console.log("Mongo User", mongoUser);
  if (!userId) redirect("/sign-in");
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div
          className="flex w-full flex-col-reverse justify-between 
        gap-5 sm:flex-row sm:items-center sm:gap-2"
        >
          <Link
            href={`/profile/${result.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={result.author.picture}
              className="rounded-full"
              width={22}
              height={22}
              alt="profile"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {result.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>
      <div className="mt-4 flex gap-2">
        <Metric
          imgUrl={"/assets/icons/clock.svg"}
          altTag=""
          value={"Asked "}
          title={`${formatDateAgo(result.createdAt)}`}
          textStyle="small-medium text-dark400_light800"
        />

        <Metric
          imgUrl={"/assets/icons/upvote.svg"}
          altTag="Upvotes"
          value={formatNumber(result.upVotes)}
          title="Votes"
          textStyle="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl={"/assets/icons/message.svg"}
          altTag="Answers"
          value={formatNumber(result.answers.length)}
          title="Answers"
          textStyle="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl={"/assets/icons/eye.svg"}
          altTag="eye"
          value={formatNumber(result.views)}
          title="Views"
          textStyle="small-medium text-dark400_light800"
        />
      </div>
      <div className="mt-3.5">
        <ParseHTML data={result.description} />
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {result.tags.map((tag: { _id: number; name: string }) => (
          <RenderTag
            key={tag._id}
            id={tag._id}
            title={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <AllAnswers
        questionId={result._id}
        user={JSON.stringify(mongoUser)}
        totalAnswers={result.answers.length}
      />

      <Answer
        user={JSON.stringify(mongoUser)}
        questionId={JSON.stringify(result._id)}
        question={JSON.stringify(result)}
      />
    </>
  );
};

export default QuestionDetails;
