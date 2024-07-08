import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MetricProps {
  imgUrl: string;
  altTag: string;
  value: string | number;
  title: string;
  textStyle?: string;
  isAuthor?: boolean;
  href?: string;
}

const Metric = ({
  imgUrl,
  altTag,
  value,
  title,
  textStyle,
  isAuthor,
  href,
}: MetricProps) => {
  const MetricContent = () => {
    return (
      <>
        <Image
          src={imgUrl}
          width={16}
          height={16}
          alt={altTag}
          className={`object-contain ${href ? "invert-colors rounded-full" : ""}`}
        />
        <p className={`flex items-center ${textStyle} gap-1`}>
          {value}

          <span
            className={`small-regular line-clamp-1 ${isAuthor ? "max-sm:hidden" : ""}`}
          >
            {title}
          </span>
        </p>
      </>
    );
  };

  if (href) {
    return (
      <Link href={href} className="flex-center gap-1">
        <MetricContent />
      </Link>
    );
  }

  return (
    <div className="flex-center flex-wrap gap-1">
      <MetricContent />
    </div>
  );
};

export default Metric;
