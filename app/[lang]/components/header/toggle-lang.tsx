"use client";
import { buttonVariants } from "@/lib/constant";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import { MdOutlineLanguage } from "react-icons/md";

const ToggleLangauge = () => {
  const { lang }: { lang: "en" | "ar" } = useParams();
  const pathName = usePathname();
  function newLink() {
    return pathName.replace(lang, lang === "ar" ? "en" : "ar");
  }
  return (
    <Link
      className={cn(
        buttonVariants.default,
        buttonVariants.variants.variant.secondary,
        buttonVariants.variants.size.default,
        "my-2"
      )}
      href={newLink()}
    >
      <MdOutlineLanguage className="mx-2" />
      {lang === "en" ? "العربية" : "english"}
    </Link>
  );
};

export default ToggleLangauge;
// const originalString = "Hello, world!";
// const substringToCut = "world";
// const substringToReplace = "everyone";

// const modifiedString = originalString.replace(
//   substringToCut,
//   substringToReplace
// );
// console.log(modifiedString); // Output:
