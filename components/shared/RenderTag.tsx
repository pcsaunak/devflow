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
  id,
  title,
  count,
  showCount,
}: {
  id: number;
  title: string;
  count?: number;
  showCount: boolean;
}) => {
  return (
    <Link href={`/tags/${id}`} className="flex-between  flex ">
      <Badge
        className="background-light800_dark300 text-dark400_light500 rounded-md px-4 py-2 text-sm font-medium uppercase"
        variant="secondary"
      >
        {title}
      </Badge>

      {showCount ? (
        <p className="small-medium text-dark500_light700">{count} + </p>
      ) : (
        ""
      )}
    </Link>
  );
};

export default RenderTag;
