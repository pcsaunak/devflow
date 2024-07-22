"use server";
import Answer from "@/models/answer.model";
import { connectToDatabse } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
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
    console.log("Error while trying to post an answer");
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
    console.log("Answer Actions - Ans for Question ID", response);
    return response;
  } catch (error) {
    console.error("Error in fetching All Answer for a specific question");
    throw error;
  }
}
