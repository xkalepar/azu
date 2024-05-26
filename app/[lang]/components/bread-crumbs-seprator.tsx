"use client";

import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

const BreadCrumbsSepratorLang = ({ className }: { className?: string }) => {
  const { lang }: { lang: "ar" | "en" } = useParams();
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      // {...props}
    >
      {lang === "en" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    </li>
  );
};

export default BreadCrumbsSepratorLang;
