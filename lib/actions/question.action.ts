"use server";

import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionParams,
  QuestionVoteParams,
} from "./shared.types";
import { connectToDatabse } from "../mongoose";
import Tag from "@/models/tag.model";
import User from "@/models/user.model";
import Question from "@/models/question.model";
import { revalidatePath } from "next/cache";

export async function getQuestions(params: GetQuestionParams) {
  try {
    connectToDatabse();

    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDatabse();

    const { title, description, tags, author, path } = params;

    // Create the question
    const question = await Question.create({
      title,
      description,
      author,
    });

    const tagDocuments = [];

    // Create the tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // Create an interaction record for the user's ask_question action

    // Increment author's reputation by +5 for creating a question
    path && revalidatePath(path);
  } catch (error) {
    console.log("Error in Question Creation", error);
    throw error;
  }
}

export const getQuestionById = async (params: GetQuestionByIdParams) => {
  try {
    connectToDatabse();
    const question = Question.findById(params.questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId picture name",
      });
    return question;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const upvoteQuestion = async (params: QuestionVoteParams) => {
  try {
    connectToDatabse();
    const { userId, questionId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};
    /**
     * If a user is clicking on upvote for the 2nd time we remove the user Id from upVotes array
     * Similar for downVotes
     */
    if (hasupVoted) {
      updateQuery = { $pull: { upVotes: JSON.parse(userId) } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downVotes: JSON.parse(userId) },
        $push: { upVotes: JSON.parse(userId) },
      };
    } else {
      updateQuery = { $addToSet: { upVotes: JSON.parse(userId) } };
    }

    console.log("Update query:", JSON.stringify(updateQuery));
    const question = await Question.findByIdAndUpdate(
      JSON.parse(questionId),
      updateQuery,
      {
        new: true,
      }
    );
    // if question is not found return an error
    if (!question) {
      throw new Error("Question not found");
    }

    // update author's reputation
    revalidatePath(path);
  } catch (error) {
    console.error("Error in upvoting question");
    throw error;
  }
};

export const downvoteQuestion = async (params: QuestionVoteParams) => {
  try {
    connectToDatabse();
    const { userId, questionId, hasupVoted, hasdownVoted, path } = params;
    let updateQuery = {};
    /**
     * If a user is clicking on upvote for the 2nd time we remove the user Id from upVotes array
     * Similar for downVotes
     */
    if (hasdownVoted) {
      updateQuery = { $pull: { downVotes: JSON.parse(userId) } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upVotes: JSON.parse(userId) },
        $push: { downVotes: JSON.parse(userId) },
      };
    } else {
      updateQuery = { $addToSet: { downVotes: JSON.parse(userId) } };
    }

    const question = await Question.findByIdAndUpdate(
      JSON.parse(questionId),
      updateQuery,
      {
        new: true,
      }
    );
    // if question is not found return an error
    if (!question) {
      throw new Error("Question not found");
    }

    // update author's reputation
    revalidatePath(path);
  } catch (error) {
    console.error("Error in upvoting question");
    throw error;
  }
};
