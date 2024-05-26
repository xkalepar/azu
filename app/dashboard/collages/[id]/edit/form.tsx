"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Suspense, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { FaSave } from "react-icons/fa";
import { useFormState } from "react-dom";
import { cn } from "@/lib/utils";
import { MdOutlineCancel } from "react-icons/md";
import { useRouter } from "next/navigation";
import LangTabs from "@/app/components/tabs";
import React from "react";
import { editCollageAction } from "../../new/action";
import { UploadButton } from "@/app/dashboard/components/upload";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Editor from "@/app/components/editor";

type EditProps = {
  className?: string;
  body?: string;
  enBody?: string;
  title?: string;
  enTitle?: string;
  logo?: string;
  collageId: string;
  arId: string;
  enId: string;
  selected?: "three" | "two" | "one";
};
const init = {
  message: "",
};

export function EditCollageForm({
  className,
  body,
  enBody,
  enTitle,
  logo,
  title,
  collageId,
  arId,
  enId,
  selected,
}: EditProps) {
  const [content, setContent] = useState<string>(body ?? "");
  const [enContent, setEnContent] = useState<string>(enBody ?? "");

  const router = useRouter();
  const [msg, dispatch] = useFormState(editCollageAction, init);
  const [image, setImage] = useState<string>(logo ?? "");
  useEffect(() => {
    if (!msg.message || msg.message.length === 0) {
      return;
    } else {
      toast({
        title: msg.message,
      });
      if (msg.message === "تمت العملية بنجاح") {
        router.replace(`/dashboard/collages/${collageId}`);
      }
    }
  }, [msg, router]);
  return (
    <form action={dispatch} className={cn(" space-y-6 ", className)}>
      <input type={"hidden"} name="logo" value={image} />
      <input type={"hidden"} name="collageId" value={collageId} />
      <input type={"hidden"} name="arId" value={arId} />
      <input type={"hidden"} name="enId" value={enId} />

      <div className="flex-between">
        <Select name="category" dir="rtl" defaultValue={selected}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="اختر صنف الكلية" defaultValue={"one"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>الأصناف</SelectLabel>
              <SelectItem value="one">العلوم الاساسية و التطبيقية</SelectItem>
              <SelectItem value="two">العلوم الانسانية</SelectItem>
              <SelectItem value="three">
                العلوم الطبية و الطبية المساعدة
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {image ? (
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden relative ">
            <Suspense fallback={<Skeleton className="w-full h-full" />}>
              <>
                <Button
                  type={"button"}
                  onClick={(e) => {
                    e.preventDefault();
                    setImage("");
                  }}
                  variant={"ghost"}
                  size={"icon"}
                  className="hover:text-red-500 absolute top-1/2 right-1/2"
                >
                  <MdOutlineCancel />
                </Button>
                <Image
                  src={image}
                  alt="some name"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </>
            </Suspense>
          </div>
        ) : (
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImage(res[0].url ?? "");
              toast({ title: "uploaded successfully" });
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
        )}
      </div>
      <LangTabs
        en={
          <div className="" dir="ltr">
            <div className="flex-1">
              <Label htmlFor="enname">Name of the college</Label>
              <Input
                defaultValue={enTitle}
                id="enname"
                type={"text"}
                placeholder="Enter the name of the college"
                name={"enname"}
                // value={enContent}
              />
            </div>

            <div className="flex-1">
              <Label htmlFor="encontent">Foundation of the college</Label>
              <Input type={"hidden"} value={enContent} name="encontent" />
              <Editor onChange={setEnContent} content={enContent} />
            </div>
          </div>
        }
        ar={
          <div className="" dir="rtl">
            <div className="flex-1">
              <Label htmlFor="name">اسم الكلية</Label>
              <Input
                defaultValue={title}
                id="name"
                type={"text"}
                placeholder="ادخل اسم الكلية"
                name={"name"}
              />
            </div>

            <div className="flex-1">
              <Label htmlFor="content">تأسيس الكلية</Label>
              <Input type={"hidden"} value={content} name="content" />
              <Editor content={content} onChange={setContent} />
            </div>
          </div>
        }
      />

      <Button>
        حفظ
        <FaSave className="mr-2 h-4 w-4" />
      </Button>
      {/* <SubmitBtn>تأكيد</SubmitBtn> */}
    </form>
  );
}
