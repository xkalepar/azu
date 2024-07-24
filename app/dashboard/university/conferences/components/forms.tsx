"use client";

import Form from "@/app/components/form";
import {
  deleteConferenceAction,
  editConferenceAction,
  newConferenceAction,
} from "../actions";
import SubmitButton from "@/app/components/custom-sumbit-btn";
import { Suspense, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { MdOutlineCancel } from "react-icons/md";
import Image from "next/image";
import {
  UploadButton,
  UploadDropzone,
} from "@/app/dashboard/components/upload";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Editor from "@/app/components/editor";
import LangTabs from "@/app/components/tabs";
import { env } from "process";

export const CreateMagazineForm = () => {
  const [image, setImage] = useState<string>("");
  const [pdf, setPdf] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [enBody, setEnBody] = useState<string>("");

  return (
    <Form
      sucess={"تم إنشاء المؤتمر بنجاح"}
      className="my-2 px-4 "
      action={newConferenceAction}
      replaceLink={`/dashboard/university/conferences`}
    >
      <div className="flex gap-2 items-start  justify-between px-4 flex-col sm:flex-row w-full">
        {image ? (
          <div className="w-[200px] h-[200px] rounded-lg overflow-hidden relative">
            <Suspense fallback={<Skeleton className="w-full h-full" />}>
              <>
                <Button
                  type={"button"}
                  onClick={(e) => {
                    e.preventDefault();
                    setImage("");
                  }}
                  variant={"outline"}
                  size={"icon"}
                  className="hover:text-red-500 absolute top-0 right-0"
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
          <div className=" flex flex-col ">
            <h3>تحميل صورة الغلاف</h3>
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setImage(res[0].url ?? "");
                toast({ title: "uploaded successfully" });
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
        )}
        {pdf ? (
          <div className="w-[200px] h-[200px] rounded-lg overflow-hidden relative">
            <Suspense fallback={<Skeleton className="w-full h-full" />}>
              <>
                <Button
                  type={"button"}
                  onClick={(e) => {
                    e.preventDefault();
                    setPdf("");
                  }}
                  variant={"outline"}
                  size={"icon"}
                  className="hover:text-red-500 absolute top-0 left-0"
                >
                  <MdOutlineCancel />
                </Button>
                <Image
                  src={env.PDf_LOGO as string}
                  alt="pdf"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </>
            </Suspense>
          </div>
        ) : (
          <div className=" flex flex-col ">
            <h3>تحميل الملف (pdf)</h3>
            <UploadDropzone
              endpoint="pdfUploader"
              onClientUploadComplete={(res) => {
                console.log(res);
                setPdf(res[0].url ?? "");
                toast({ title: "uploaded successfully" });
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
        )}
      </div>
      <LangTabs
        className="mt-2"
        ar={
          <>
            <Input value={body} type={"hidden"} name="body" />

            <div className="my-2">
              <Label htmlFor="title">عنوان المؤتمر</Label>
              <Input
                type={"text"}
                className="sm:w-1/2 lg:w-1/4"
                name="title"
                id="title"
                placeholder="المؤتمر هنا"
              />
            </div>
            <Editor content={body} onChange={setBody} />
          </>
        }
        en={
          <>
            <Input value={enBody} type={"hidden"} name="enbody" />
            <div className="my-2">
              <Label htmlFor="entitle">conference title</Label>
              <Input
                type={"text"}
                className="sm:w-1/2 lg:w-1/4"
                name="entitle"
                id="entitle"
                placeholder="enter title"
              />
            </div>
            <Editor content={enBody} onChange={setEnBody} />
          </>
        }
      />
      <SubmitButton className="w-full md:w-1/4" type={"submit"}>
        حفظ
      </SubmitButton>
      {/* image  */}
      <Input value={image} type={"hidden"} name="image" />
      <Input value={pdf} type={"hidden"} name="pdf" />
      <Separator />
    </Form>
  );
};

export const UpdateMagazineForm = ({
  image: oldImage = "",
  pdf: oldPdf = "",
  body: oldBody = "",
  enBody: oldEnBody = "",
  enTitle = "",
  title = "",
  magazineId,
  arId,
  enId,
}: {
  image: string;
  pdf?: string;
  body?: string;
  enBody?: string;
  title?: string;
  arId?: string;
  enId?: string;
  magazineId: string;
  enTitle?: string;
}) => {
  const [image, setImage] = useState<string>(oldImage);
  const [body, setBody] = useState<string>(oldBody);
  const [enBody, setEnBody] = useState<string>(oldEnBody);
  const [pdf, setPdf] = useState<string>(oldPdf);

  return (
    <Form
      className="my-2 px-4"
      action={editConferenceAction}
      sucess="تم تحديث المؤتمر بنجاح"
      replaceLink={`/dashboard/university/conferences/${magazineId}`}
    >
      <Input type={"hidden"} name="magazineId" value={magazineId} />
      <div className="flex gap-2 items-start  justify-between px-4 flex-col sm:flex-row w-full">
        {image ? (
          <div className="w-[200px] h-[200px] rounded-lg overflow-hidden relative">
            <Suspense fallback={<Skeleton className="w-full h-full" />}>
              <>
                <Button
                  type={"button"}
                  onClick={(e) => {
                    e.preventDefault();
                    setImage("");
                  }}
                  variant={"outline"}
                  size={"icon"}
                  className="hover:text-red-500 absolute top-0 right-0"
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
          <div className=" flex flex-col ">
            <h3>تحميل صورة الغلاف</h3>
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setImage(res[0].url ?? "");
                toast({ title: "uploaded successfully" });
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
        )}
        {pdf ? (
          <div className="w-[200px] h-[200px] rounded-lg overflow-hidden relative">
            <Suspense fallback={<Skeleton className="w-full h-full" />}>
              <>
                <Button
                  type={"button"}
                  onClick={(e) => {
                    e.preventDefault();
                    setPdf("");
                  }}
                  variant={"outline"}
                  size={"icon"}
                  className="hover:text-red-500 absolute top-0 left-0"
                >
                  <MdOutlineCancel />
                </Button>
                <Image
                  src={env.PDf_LOGO as string}
                  alt="pdf"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </>
            </Suspense>
          </div>
        ) : (
          <div className=" flex flex-col ">
            <h3>تحميل الملف (pdf)</h3>
            <UploadDropzone
              endpoint="pdfUploader"
              onClientUploadComplete={(res) => {
                console.log(res);
                setPdf(res[0].url ?? "");
                toast({ title: "uploaded successfully" });
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
        )}
      </div>
      <LangTabs
        ar={
          <>
            <Input value={body} type={"hidden"} name="body" />

            <div className="my-2">
              <Label htmlFor="title">عنوان المؤتمر</Label>
              <Input
                defaultValue={title}
                type={"text"}
                className="sm:w-1/2 lg:w-1/4"
                name="title"
                id="title"
                placeholder="المؤتمر هنا"
              />
            </div>
            <Editor content={body} onChange={setBody} />
          </>
        }
        en={
          <>
            <Input value={enBody} type={"hidden"} name="enbody" />
            <div className="my-2">
              <Label htmlFor="entitle">conference title</Label>
              <Input
                defaultValue={enTitle}
                type={"text"}
                className="sm:w-1/2 lg:w-1/4"
                name="entitle"
                id="entitle"
                placeholder="enter title"
              />
            </div>
            <Editor content={enBody} onChange={setEnBody} />
          </>
        }
      />

      <SubmitButton className="w-full md:w-1/4" type={"submit"}>
        تعديل
      </SubmitButton>
      {/* image  */}
      <Input value={arId} type={"hidden"} name="arId" />
      <Input value={enId} type={"hidden"} name="enId" />
      <Input value={image} type={"hidden"} name="image" />
      <Input value={pdf} type={"hidden"} name="pdf" />
      <Separator />
    </Form>
  );
};

export const DeleteMagazineForm = ({
  id,
  arId,
  enId,
}: {
  id: string;
  arId: string;
  enId: string;
}) => {
  return (
    <Form
      action={deleteConferenceAction}
      sucess={"تم حذف المؤتمر بنجاح"}
      replaceLink={`/dashboard/university/conferences`}
    >
      <Input type={"hidden"} name="id" value={id} />
      <Input type={"hidden"} name="arId" value={arId} />
      <Input type={"hidden"} name="enId" value={enId} />
      <SubmitButton className="w-full bg-red-500 hover:bg-red-400">
        حذف
      </SubmitButton>
    </Form>
  );
};

export default DeleteMagazineForm;
