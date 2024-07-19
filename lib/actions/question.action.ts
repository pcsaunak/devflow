"use server";

import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionParams,
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

export const getQuestionDetails = async (params: GetQuestionByIdParams) => {
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
