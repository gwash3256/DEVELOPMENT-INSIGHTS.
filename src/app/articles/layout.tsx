"use client";

import { useRef } from "react";
import ReadingProgress from "@/components/article/ReadingProgress";

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contentRef = useRef(null);

  return (
    <>
      <ReadingProgress contentRef={contentRef} />
      <div ref={contentRef}>{children}</div>
    </>
  );
}
