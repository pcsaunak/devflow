import { TagType } from "@/types";
import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";

/**
 *
 * @param Accepts TagType & showCount
 * @returns Component
 *
 * Initially created using default HTML components.
 * Moving away to ShadCn Component
 */

const RenderTag = ({
  tag,
  showCount,
}: {
  tag: TagType;
  showCount: boolean;
}) => {
  return (
    <Link href={`/tags/${tag.id}`} className="flex-between  flex ">
      <Badge
        className="background-light800_dark300 text-dark400_light500 rounded-md px-4 py-2 text-sm font-medium uppercase"
        variant="secondary"
      >
        {tag.title}
      </Badge>

      {showCount ? (
        <p className="small-medium text-dark500_light700">{tag.count} + </p>
      ) : (
        ""
      )}
    </Link>
  );
};

export default RenderTag;
