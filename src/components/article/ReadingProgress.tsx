"use client";

import { useEffect, useState } from "react";

interface ReadingProgressProps {
  contentRef: React.RefObject<HTMLElement | null>;
}

export default function ReadingProgress({ contentRef }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const element = contentRef.current;
      const windowHeight = window.innerHeight;
      const elementHeight = element.offsetHeight;
      const elementTop = element.getBoundingClientRect().top;

      // Calculate how much of the element has been scrolled
      const scrolled = Math.max(0, windowHeight - elementTop);
      const total = elementHeight + windowHeight;
      const percent = Math.min(100, (scrolled / total) * 100);

      setProgress(percent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [contentRef]);

  return (
    <div className="fixed top-16 left-0 right-0 h-1 bg-gray-200 dark:bg-slate-800 z-40">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
