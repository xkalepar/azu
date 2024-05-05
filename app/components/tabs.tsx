"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";

interface Props {
  ar: ReactNode;
  en: ReactNode;
}
const Tabs = ({ ar, en }: Props) => {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  return (
    <div className="flex flex-col gap-3">
      <div className=" w-fit mx-auto bg-secondary px-2 py-1 rounded-lg flex justify-start items-center gap-2">
        <button
          type={"button"}
          onClick={() => setLang("ar")}
          className={cn(
            "rounded-md px-2 py-1 transition-all",
            lang === "ar" && "bg-white"
          )}
        >
          العربية
        </button>
        <button
          type={"button"}
          onClick={() => setLang("en")}
          className={cn(
            "rounded-md px-2 py-1 transition-all",
            lang === "en" && "bg-white"
          )}
        >
          english
        </button>
      </div>
      <Separator />
      <div className="px-16 py-2">
        <div
          dir="rtl"
          className={cn("hidden transition-all", lang === "ar" && "block")}
        >
          {ar}
        </div>
        <div
          dir="ltr"
          className={cn("hidden transition-all", lang === "en" && "block")}
        >
          {en}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
