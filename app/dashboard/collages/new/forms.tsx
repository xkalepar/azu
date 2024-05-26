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
import { editCollageAction, newCollageAction } from "./action";
import { useRouter } from "next/navigation";
import { UploadButton } from "../../components/upload";

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

const init = {
  message: "",
};

enum Lang {
  ar = "ar",
  en = "en",
}
export default function CollageForm({
  className,
  lang,
}: {
  className?: string;
  lang: Lang;
  // lang: string;
}) {
  const [content, setContent] = useState<string>("");
  const [enContent, setEnContent] = useState<string>("");

  const router = useRouter();
  const [msg, dispatch] = useFormState(newCollageAction, init);
  const [image, setImage] = useState<string>("");
  useEffect(() => {
    if (!msg.message || msg.message.length === 0) {
      return;
    } else {
      toast({
        title: msg.message,
      });
      if (msg.message === "تمت العملية بنجاح") {
        router.replace("/dashboard/collages");
      }
    }
  }, [msg, router]);
  return (
    <form action={dispatch} className={cn(" space-y-6 ", className)}>
      <input type={"hidden"} name="logo" value={image} />

      <div className="flex-between">
        <Select name="category" dir="rtl">
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

      <div
        className={cn(lang === Lang.ar ? "block " : "hidden", "transition-all")}
      >
        <div className="" dir="rtl">
          <div className="flex-1">
            <Label htmlFor="name">اسم الكلية</Label>
            <Input
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
            {/* <Textarea
              name="content"
              id="content"
              placeholder="ادخل بيانات تأسيس الكلية"
            /> */}
          </div>

          {/*           <div className="flex-1">
            <Label htmlFor="goals">رؤية ورسالة واهداف الكلية</Label>
            <Textarea
              name="goals"
              id="goals"
              placeholder="ادخل رؤية ورسالة واهداف الكلية"
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="management">عمادة الكلية</Label>
            <Textarea
              id="management"
              name="management"
              placeholder="ادخل بيانات عمادة الكلية"
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="desk">مجلس الكلية</Label>
            <Textarea
              placeholder="ادخل بيانات مجلس الكلية"
              name="desk"
              id="desk"
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="shoan">وكيل الكلية للشؤون العلمية</Label>
            <Textarea
              placeholder="ادخل بيانات وكيل الكلية للشؤون العلمية"
              name="shoan"
              id="shoan"
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="rating">الأعتماد و التصنيف</Label>
            <Textarea
              placeholder="ادخل بيانات الأعتماد و التصنيف"
              name="rating"
              id="rating"
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="structure">الهيكل التنظيمي للكلية</Label>
            <Textarea
              placeholder="ادخل بيانات الهيكل التنظيمي للكلية"
              name="structure"
              id="structure"
            />
          </div> */}
        </div>

        {/*         <Input type="hidden" name="list" value={JSON.stringify(list)} />
        <div className="px-4 py-1 flex flex-col gap-4 ">
          <Label htmlFor="list">سياسات و لوائح</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="العنوان"
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="المحتوى"
          />
          <Button
            type={"button"}
            onClick={(e) => {
              e.preventDefault();
              if (!title || !content) return;
              setList((prev) => [...prev, { title, content }]);
            }}
            variant={"ghost"}
            size={"icon"}
          >
            <PlusIcon />
          </Button>
          <ul>
            {list?.map((li, index) => (
              <li
                key={index}
                className=" relative hover:bg-secondary px-2 py-1 rounded-md"
              >
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={() => {
                    console.log(li.title);
                    console.log(list[index].title);
                    const newList = list.filter(
                      (item) => item.title !== li.title
                    );
                    setList(newList);
                  }}
                  className=" absolute top-0 left-0"
                >
                  <MdOutlineCancel />
                </Button>
                <div>
                  {index + 1}- {li.title}
                </div>{" "}
                <div className="mr-1">{li.content}</div>{" "}
              </li>
            ))}
          </ul>
        </div> */}
      </div>
      <div
        className={cn(lang === Lang.en ? "block" : "hidden", "transition-all")}
      >
        <div className="" dir="ltr">
          <div className="flex-1">
            <Label htmlFor="enname">Name of the college</Label>
            <Input
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
            {/* <Textarea
              name="encontent"
              id="encontent"
              placeholder="Enter the foundation of the college"
            /> */}
          </div>

          {/*           <div className="flex-1">
            <Label htmlFor="enorigin">Foundation of the college</Label>
            <Textarea
              name="enorigin"
              id="enorigin"
              placeholder="Enter the foundation of the college"
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="engoals">
              Vision, Mission, and Goals of the College
            </Label>
            <Textarea
              name="engoals"
              id="engoals"
              placeholder="Enter Vision, Mission, and Goals of the College"
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="enmanagement">Dean of the College</Label>
            <Textarea
              id="enmanagement"
              name="enmanagement"
              placeholder="Enter Dean of the College"
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="endesk">College Council</Label>
            <Textarea
              placeholder="Enter College Council"
              name="endesk"
              id="endesk"
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="enshoan">
              Vice Dean of the College for Academic Affairs
            </Label>
            <Textarea
              placeholder="Enter Vice Dean of the College for Academic Affairs"
              name="enshoan"
              id="enshoan"
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="enrating">Accreditation and Ranking</Label>
            <Textarea
              placeholder="Enter Accreditation and Ranking"
              name="enrating"
              id="enrating"
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="enstructure">
              The Organizational Structure of the College
            </Label>
            <Textarea
              placeholder="Enter The Organizational Structure of the College"
              name="enstructure"
              id="enstructure"
            />
          </div> */}
        </div>

        {/*  <Input type="hidden" name="enlist" value={JSON.stringify(list)} />
        <div className="px-4 py-1 flex flex-col gap-4 " dir="ltr">
          <Label htmlFor="enlist">Policies and Regulations</Label>
          <Input
            id="enlist"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="content"
          />
          <Button
            type={"button"}
            onClick={(e) => {
              e.preventDefault();
              if (!title || !content) return;
              setEnList((prev) => [...prev, { title, content }]);
            }}
            variant={"ghost"}
            size={"icon"}
          >
            <PlusIcon />
          </Button>
          <ul>
            {enList?.map((li, index) => (
              <li
                key={index}
                className=" relative hover:bg-secondary px-2 py-1 rounded-md"
              >
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={() => {
                    const newList = list.filter(
                      (item) => item.title !== li.title
                    );
                    setEnList(newList);
                  }}
                  className=" absolute top-0 left-0"
                >
                  <MdOutlineCancel />
                </Button>
                <div>
                  {index + 1}- {li.title}
                </div>{" "}
                <div className="mr-1">{li.content}</div>{" "}
              </li>
            ))}
          </ul>
        </div> */}
      </div>

      <Button>
        حفظ
        <FaSave className="mr-2 h-4 w-4" />
      </Button>
      {/* <SubmitBtn>تأكيد</SubmitBtn> */}
    </form>
  );
}

type EditProps = {
  className?: string;
  lang: Lang;
  body?: string;
  enBody?: string;
  title?: string;
  enTitle?: string;
  logo?: string;
  collageId: string;
  arId: string;
  enId: string;
};
export function EditCollageForm({
  className,
  lang,
  body,
  enBody,
  enTitle,
  logo,
  title,
  collageId,
  arId,
  enId,
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
        router.replace("/dashboard/collages");
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
        <Select name="category" dir="rtl">
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

      <div
        className={cn(lang === Lang.ar ? "block " : "hidden", "transition-all")}
      >
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
      </div>
      <div
        className={cn(lang === Lang.en ? "block" : "hidden", "transition-all")}
      >
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
      </div>

      <Button>
        حفظ
        <FaSave className="mr-2 h-4 w-4" />
      </Button>
      {/* <SubmitBtn>تأكيد</SubmitBtn> */}
    </form>
  );
}
