import { buttonVariants } from "@/lib/constant";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const page = ({ params }: { params: { lang: string } }) => {
  const { lang } = params;
  return (
    <div className="flex h-full w-full flex-col justify-center items-center">
      {lang === "en" ? (
        <h1 className=" font-bold text-xl text-center">comming soon</h1>
      ) : (
        <h1 className=" font-bold text-xl text-center">قريبا</h1>
      )}
      <Link className={cn(buttonVariants.variants.variant.link)} href={"/"}>
        {lang === "ar" ? "الصفحة الريئسية" : "home page"}
      </Link>
    </div>
  );
};

export default page;
