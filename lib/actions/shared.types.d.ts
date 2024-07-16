/**
 * We create a shared types
 * typescript type information about an API
 */

import { IUser } from "@/models/user.model";
import { Schema } from "mongoose";

export interface GetQuestionParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface CreateQuestionParams {
  title: string;
  description: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path?: string;
}

export interface CreateUserParams {
  clerkId: string;
  email: string;
  picture: string;
  name: string;
  username?: string;
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface DeleteUserParams {
  clerkId: string;
}

export interface GetAllUserParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string; // Add a search query Parameter
}

export interface GetTopInteractedTagsParams {
  userId: string;
  limit?: number;
}
