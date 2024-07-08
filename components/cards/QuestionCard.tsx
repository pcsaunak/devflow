import Link from "next/link";
import React from "react";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import { formatDateAgo, formatNumber } from "@/lib/utils";

interface QuestionCardProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upVotes: number;
  answers: Array<object>;
  views: number;
  createdAt: Date;
}
const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upVotes,
  answers,
  views,
  createdAt,
}: QuestionCardProps) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <span className="text-dark400_light700 subtle-regular line-clamp-1 flex sm:hidden">
          {formatDateAgo(createdAt)}
        </span>
        <Link href={`/question/${_id}`}>
          <h3
            className="sm:h3-semibold base-semibold 
          text-dark200_light900 line-clamp-1 flex-1"
          >
            {title}
          </h3>
        </Link>
      </div>
      {/* If signed in add edit delete actions */}
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag
            id={Number(tag._id)}
            showCount={false}
            title={tag.name}
            key={tag._id}
          />
        ))}
      </div>

      <div className="flex-between mt-6 flex w-full flex-wrap gap-3">
        <Metric
          imgUrl={"/assets/icons/avatar.svg"}
          altTag="Avataar"
          value={author.name}
          title={`- ${formatDateAgo(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyle="body-medium text-dark400_light700"
        />
        <Metric
          imgUrl={"/assets/icons/upvote.svg"}
          altTag="Upvotes"
          value={formatNumber(upVotes)}
          title="Votes"
          textStyle="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl={"/assets/icons/message.svg"}
          altTag="Answers"
          value={formatNumber(answers.length)}
          title="Answers"
          textStyle="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl={"/assets/icons/eye.svg"}
          altTag="eye"
          value={formatNumber(views)}
          title="Views"
          textStyle="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
