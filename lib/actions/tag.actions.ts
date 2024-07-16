"use server";

import User from "@/models/user.model";
import { connectToDatabse } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";

export const getTopInteractedTags = async (
  params: GetTopInteractedTagsParams
) => {
  try {
    connectToDatabse();
    // eslint-disable-next-line no-unused-vars
    const { userId, limit = 3 } = params;
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // Find interactions for this user and group by tags
    // A new model called Interaction will be created.
    return [
      { _id: 91231, name: "html" },
      { _id: 56874, name: "css" },
      { _id: 78458, name: "next.js" },
    ];
  } catch (error) {
    console.error("Error while fetching all users");
    throw error;
  }
};
