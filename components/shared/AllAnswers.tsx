import React from "react";
import Filter from "./Filter";
import { AnswerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import { formatDateAgo } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";

interface Props {
  questionId: string;
  user: string;
  totalAnswers: number;
  page?: string;
  filter?: string;
}
const AllAnswers = async ({
  questionId,
  user,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const result = await getAnswers({
    questionId,
  });
  console.log("All Answers for this current question", result);

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers </h3>

        <Filter
          filters={AnswerFilters}
          route={""}
          placeHolder="Select a filter"
        />
      </div>
      <div>
        {result && result.length > 0 ? (
          result.map((answer: any) => (
            <article key={answer._id} className="light-border border-b py-10">
              <div className="flex items-center justify-between">
                {/* SPAN ID  scroll to a specific segment based on the ID */}

                <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row">
                  <Link
                    href={`/profile/${answer.author.clerkId}`}
                    className="flex flex-1 items-start gap-1 sm:items-center"
                  >
                    <Image
                      src={answer.author.picture}
                      width={18}
                      height={18}
                      alt="profile"
                      className="rounded-full object-cover max-sm:mt-0.5"
                    />
                    <div
                      className="flex flex-col sm:flex-row
                  sm:items-center"
                    >
                      <p className="body-semibold text-dark300_light700">
                        {answer.author.name}{" "}
                      </p>

                      <p
                        className="small-regular text-light400_light500
                      mt-0.5 line-clamp-1"
                      >
                        {" "}
                        - answered - {formatDateAgo(answer.createdAt)}
                      </p>
                    </div>
                  </Link>
                  <div className="flex justify-end">
                    <Votes
                      itemId={JSON.stringify(answer._id)}
                      type="answer"
                      userId={user}
                      downvotes={answer.downVotes.length}
                      upvotes={answer.upVotes.length}
                      key={answer._id}
                      hasdownVoted={answer.downVotes.includes(
                        JSON.parse(user)._id
                      )}
                      hasupVoted={answer.upVotes.includes(JSON.parse(user)._id)}
                    />
                  </div>
                </div>
              </div>
              <ParseHTML data={answer.content} />
            </article>
          ))
        ) : (
          <div>No Answer Present</div>
        )}
      </div>
    </div>
  );
};

export default AllAnswers;
