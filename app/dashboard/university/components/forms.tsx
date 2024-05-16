"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { FaSave } from "react-icons/fa";
import { useFormState } from "react-dom";
import { cn } from "@/lib/utils";
import { editUniversityAction } from "../action";
import { useRouter } from "next/navigation";

import Editor from "@/app/components/editor";
import LangTabs from "@/app/components/tabs";

const init = {
  message: "",
};

enum Lang {
  ar = "ar",
  en = "en",
}
export default function UniveristyForm({
  className,
  content: defaultContent,
  enContent: defaultEnContent,
}: {
  className?: string;
  content?: string;
  enContent?: string;
}) {
  const [content, setContent] = useState<string>(defaultContent ?? "");
  const [enContent, setEnContent] = useState<string>(defaultEnContent ?? "");

  const router = useRouter();
  const [msg, dispatch] = useFormState(editUniversityAction, init);
  useEffect(() => {
    if (!msg.message || msg.message.length === 0) {
      return;
    } else {
      toast({
        title: msg.message,
      });
      if (msg.message === "تمت العملية بنجاح") {
        router.replace("/dashboard/university");
      }
    }
  }, [msg, router]);
  return (
    <form action={dispatch} className={cn(" space-y-6 ", className)}>
      <LangTabs
        ar={
          <div className="" dir="rtl">
            <div className="flex-1">
              <Label htmlFor="name">اسم الجامعة</Label>
              <Input
                id="name"
                type={"text"}
                placeholder="ادخل اسم الجامعة"
                name={"name"}
              />
            </div>

            <div className="flex-1">
              <Label htmlFor="content">بيانات الجامعة</Label>
              <Input type={"hidden"} value={content} name="content" />
              <Editor content={content} onChange={setContent} />
            </div>
          </div>
        }
        en={
          <div className="" dir="ltr">
            <div className="flex-1">
              <Label htmlFor="enname">Name of the Univeristy</Label>
              <Input
                id="enname"
                type={"text"}
                placeholder="Enter the name of the Univeristy"
                name={"enname"}
              />
            </div>

            <div className="flex-1">
              <Label htmlFor="encontent">Foundation of the Univeristy</Label>
              <Input type={"hidden"} value={enContent} name="encontent" />
              <Editor onChange={setEnContent} content={enContent} />
            </div>
          </div>
        }
      />

      <Button>
        حفظ
        <FaSave className="mr-2 h-4 w-4" />
      </Button>
    </form>
  );
}
