"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useState } from "react";
import CollageForm from "../forms";

enum Lang {
  ar = "ar",
  en = "en",
}
const Tabs = () => {
  const [lang, setLang] = useState<Lang>(Lang.ar);
  return (
    <div className="flex flex-col gap-3">
      <div className=" w-fit mx-auto bg-secondary px-2 py-1 rounded-lg flex justify-start items-center gap-2">
        <button
          type={"button"}
          onClick={() => setLang(Lang.ar)}
          className={cn(
            "rounded-md px-2 py-1 transition-all",
            lang === Lang.ar && "bg-white"
          )}
        >
          العربية
        </button>
        <button
          type={"button"}
          onClick={() => setLang(Lang.en)}
          className={cn(
            "rounded-md px-2 py-1 transition-all",
            lang === Lang.en && "bg-white"
          )}
        >
          english
        </button>
      </div>
      <Separator />
      <div className="px-16 py-2">
        <CollageForm lang={lang} />
      </div>
    </div>
  );
};

export default Tabs;
