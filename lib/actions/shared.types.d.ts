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
