"use client";
import React, { useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AnswerSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/context/ThemeProvider";
import { Button } from "../ui/button";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.action";
import { usePathname } from "next/navigation";

/**
 * shadCn and react-hook-form is suppose to work very closely.
 * Follow the shadcn docs for implementing the Form.
 *
 * @returns Form
 */

const Answer = ({
  user,
  questionId,
  question,
}: {
  user: string;
  questionId: string;
  question: string;
}) => {
  // Fetching custom context

  const { mode } = useTheme();
  const editorRef = useRef();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  const pathName = usePathname();
  const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
    setIsSubmitting(true);
    try {
      await createAnswer({
        content: values.answer,
        author: JSON.parse(user),
        question: JSON.parse(questionId),
        path: pathName,
      });

      // so that we can submit another question reset the page
      form.reset();
      // clear our editor
      if (editorRef.current) {
        const editor = editorRef.current as any; // To make Typescript happy
        editor.setContent("");
      }
    } catch (error) {
      console.error("Error in submitting answer");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <div className="flex justify-between sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold mt-8">Write your answer here</h4>
        <Button className="btn light-border-2 gap-1.5 rounded-md py-2.5 text-primary-500 shadow-none dark:text-primary-500">
          <Image
            src={"/assets/icons/stars.svg"}
            alt="generate-ai-answer"
            height={12}
            width={12}
            className="object-contain"
            onClick={() => {}}
          />
          Generate an AI Answer
        </Button>
      </div>

      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="-mt-3.5">
                  {/* To Do add an editor component/ */}
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(_evt, editor) =>
                      // @ts-ignore
                      (editorRef.current = editor)
                    }
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "codesample | bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist ",
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit !text-light-900"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting ..." : "Post Answer"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Answer;
