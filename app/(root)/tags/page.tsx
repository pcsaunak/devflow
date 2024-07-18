import TagCard from "@/components/cards/TagCard";
import Filter from "@/components/shared/Filter";
import LocalSearchBar from "@/components/shared/LocalSearchBar";
import NoResult from "@/components/shared/NoResult";
import { TagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.actions";
import React from "react";

const Page = async () => {
  const result = await getAllTags();
  //   const result = [];

  console.log("Tags Fetched", result);
  return (
    <>
      <h1 className="h1-bold">Tags</h1>
      <div className="mt-5 flex gap-5">
        <LocalSearchBar
          route="/tags"
          iconPosition="left"
          placeHolder="Search for tags"
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
        />

        <Filter
          route="/tags"
          filters={TagFilters}
          placeHolder="Select a Filter"
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {result.length > 0 ? (
          result.map((tag) => <TagCard key={tag._id} tag={tag} />)
        ) : (
          <NoResult
            description="It looks like there are no tags"
            imgSrc={"/assets/icons/question.svg"}
            displayMsg={"It looks like there are no tags"}
            link={"/ask-question"}
            linkTitle={"Ask a question"}
          />
        )}
      </section>
    </>
  );
};

export default Page;
