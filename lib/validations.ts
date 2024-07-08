import { z } from "zod";

export const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(50),
});

export const questionSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be atleast 5 characters",
    })
    .max(130),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});
