import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";

// eslint-disable-next-line no-unused-vars
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const AskQuestion = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });
  console.log("Clerk User Id", mongoUser);
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a public question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser)} />
      </div>
    </div>
  );
};

export default AskQuestion;
