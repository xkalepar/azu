"use client";

import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { FaSave } from "react-icons/fa";
import { useFormState } from "react-dom";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import LangTabs from "@/app/components/tabs";
import React from "react";
import Editor from "@/app/components/editor";
import SubmitButton from "@/app/components/custom-sumbit-btn";
import { deleteSectionAction, editSectionAction } from "./actions";
import { Trash } from "lucide-react";
import Form from "@/app/components/form";

type EditProps = {
  className?: string;
  body?: string;
  enBody?: string;
  title?: string;
  enTitle?: string;

};
const init = {
  message: "",
};

export function EditSectionForm({
  className,
  body,
  enBody,
  enTitle,
  title,
}: EditProps) {
  const { sectionId, collageId } = useParams()
  const [content, setContent] = useState<string>(body ?? "");
  const [enContent, setEnContent] = useState<string>(enBody ?? "");

  const router = useRouter();
  const [msg, dispatch] = useFormState(editSectionAction, init);
  useEffect(() => {
    if (!msg.message || msg.message.length === 0) {
      return;
    } else {
      toast({
        title: msg.message,
      });
      if (msg.message === "تمت العملية بنجاح") {
        router.replace(`/dashboard/sections/${collageId}/${sectionId}`);
      }
    }
  }, [msg, router]);
  return (
    <form action={dispatch} className={cn(" space-y-6 ", className)}>
      <input type={"hidden"} name="sectionId" value={sectionId} />
      {/* <input type={"hidden"} name="arId" value={arId} />
      <input type={"hidden"} name="enId" value={enId} /> */}


      <LangTabs
        en={
          <div className="" dir="ltr">
            <div className="flex-1">
              <Label htmlFor="entitle">Name of the section</Label>
              <Input
                defaultValue={enTitle}
                id="entitle"
                type={"text"}
                placeholder="Enter the name of the section"
                name={"entitle"}
              // value={enContent}
              />
            </div>

            <div className="flex-1">
              <Label htmlFor="encontent">Foundation of the section</Label>
              <Input type={"hidden"} value={enContent} name="encontent" />
              <Editor onChange={setEnContent} content={enContent} />

            </div>
          </div>
        }
        ar={
          <div className="" dir="rtl">
            <div className="flex-1">
              <Label htmlFor="title">اسم القسم</Label>
              <Input
                defaultValue={title}
                id="title"
                type={"text"}
                placeholder="ادخل اسم القسم"
                name={"title"}
              />
            </div>

            <div className="flex-1">
              <Label htmlFor="content">بيانات القسم</Label>
              <Input type={"hidden"} value={content} name="content" />
              <Editor content={content} onChange={setContent} />
            </div>
          </div>
        }
      />

      <SubmitButton>  حفظ
        <FaSave className="mr-2 h-4 w-4" />
      </SubmitButton>
    </form>
  );
}
export function DeleteSectionForm({
  className,

}: { className?: string }) {
  const { sectionId, collageId } = useParams()
  return (
    <Form
      action={deleteSectionAction}
      replaceLink={`/dashboard/sections/${collageId}/`}
      sucess="تمت العملية بنجاح"
    >
      <input type={"hidden"} name="id" value={sectionId} />
      <SubmitButton>
        حذف
        <Trash className="mr-2 h-4 w-4" />
      </SubmitButton>
    </Form>
  );
}

