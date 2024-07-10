"use server";

import User from "@/models/user.model";
import { connectToDatabse } from "../mongoose";

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
