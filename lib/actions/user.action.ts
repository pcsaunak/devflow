"use server";

import User from "@/models/user.model";
import { connectToDatabse } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUserParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/models/question.model";

export const getUserById = async (params: any) => {
  try {
    connectToDatabse();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createUser = async (userData: CreateUserParams) => {
  try {
    connectToDatabse();
    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.error("Error while creating User");
    throw error;
  }
};

export const updateUser = async (params: UpdateUserParams) => {
  try {
    connectToDatabse();
    const { clerkId, updateData, path } = params;
    // 3rd param is to define that we need to create a new instance of the user.
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });

    revalidatePath(path);
  } catch (error) {
    console.error("Error while creating User");
    throw error;
  }
};

export const deleteUser = async (params: DeleteUserParams) => {
  try {
    connectToDatabse();
    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }

    // Delete all data associated with the user
    // eslint-disable-next-line no-unused-vars
    // const userQuestionIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );

    // delete user questions
    await Question.deleteMany({ author: user._id });

    // TODO: delete user answers, comments etc

    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.error("Error while creating User");
    throw error;
  }
};

export const getAllUsers = async (params: GetAllUserParams) => {
  try {
    connectToDatabse();
    // const { page=1, pageSize=20, filter, search} = params
    const users = await User.find({});
    console.log("Data from User Action", users);
    return users;
  } catch (error) {
    console.error("Error while fetching all users");
    throw error;
  }
};
