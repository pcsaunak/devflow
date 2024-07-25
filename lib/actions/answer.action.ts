"use server";
import Answer from "@/models/answer.model";
import { connectToDatabse } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import Question from "@/models/question.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabse();
    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({
      content,
      author,
      question,
    });

    // Add the answer to the Question Answer array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // TODO: Add interaction ...

    revalidatePath(path);
  } catch (error) {
    console.error("Error while trying to post an answer");
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabse();
    // eslint-disable-next-line no-unused-vars
    const { questionId, page, pageSize, sortBy } = params;
    const response = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });
    return response;
  } catch (error) {
    console.error("Error in fetching All Answer for a specific question");
    throw error;
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    console.log("Values received", { params });
    connectToDatabse();
    const { answerId, hasdownVoted, hasupVoted, path, userId } = params;
    let updateQuery = {};
    if (hasupVoted) {
      // Update the necessary field that a user has upvoted.
      updateQuery = { $pull: { upVotes: JSON.parse(userId)._id } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { upVotes: JSON.parse(userId)._id },
        $push: { downVotes: JSON.parse(userId)._id },
      };
    } else {
      updateQuery = { $addToSet: { upVotes: JSON.parse(userId) } };
    }

    const updatedAnswer = await Answer.findByIdAndUpdate(
      JSON.parse(answerId),
      updateQuery,
      {
        new: true,
      }
    );

    if (!updatedAnswer) {
      throw new Error("No Answer found");
    }
    revalidatePath(path);
  } catch (error) {
    console.error("Error in upvoting answer");
    throw error;
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabse();
    const { answerId, hasdownVoted, hasupVoted, path, userId } = params;
    let updateQuery = {};
    if (hasdownVoted) {
      // Update the necessary field that a user has upvoted.
      updateQuery = { $pull: { downVotes: JSON.parse(userId)._id } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { downVotes: JSON.parse(userId)._id },
        $push: { upVotes: JSON.parse(userId)._id },
      };
    } else {
      updateQuery = { $addToSet: { downVotes: JSON.parse(userId) } };
    }

    const updatedAnswer = await Answer.findByIdAndUpdate(
      JSON.parse(answerId),
      updateQuery,
      {
        new: true,
      }
    );

    if (!updatedAnswer) {
      throw new Error("No Answer found");
    }
    revalidatePath(path);
  } catch (error) {
    console.error("Error in upvoting answer");
    throw error;
  }
}
