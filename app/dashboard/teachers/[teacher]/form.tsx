"use client";
import SubmitButton from "@/app/components/custom-sumbit-btn";
import Form from "@/app/components/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { Suspense, useState } from "react";
import { FaSave } from "react-icons/fa";
import {
  newUserAction,
  updateUserAction,
} from "../../sections/[collageId]/[sectionId]/teachers/actions";
import { useParams } from "next/navigation";
import { MdOutlineCancel } from "react-icons/md";
import Image from "next/image";
import { env } from "process";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UploadDropzone } from "@/app/dashboard/components/upload";
import { toast } from "@/components/ui/use-toast";
import Editor from "@/app/components/editor";
import InputValidator from "@/app/[lang]/components/phone-input";

interface Props {
  fullName: string;
  image?: string | null;
  cv?: string | null;
  content?: string | null;
  phone: number;
  acadamicCondtion?: string | null;
}

const UpdateTeacherForm = ({
  fullName,
  content,
  cv: OldCv,
  image: OldImage,
  phone,
}: Props) => {
  const { teacher: id } = useParams();
  const [body, setBody] = useState<string>(content ?? "");
  const [image, setImage] = useState<string | null | undefined>(OldImage);
  const [cv, setCv] = useState<string | null | undefined>(OldCv);

  return (
    <Form action={updateUserAction} replaceLink={`/dashboard/teachers/${id}`}>
      <Input type="hidden" name="image" value={image ?? ""} />
      <Input type="hidden" name="cv" value={cv ?? ""} />
      <Input type="hidden" name="userId" value={id} />
      <Input type="hidden" name="content" value={body} />
      <Label htmlFor="fullName">اسم عضو هئية التدريس</Label>
      <Input
        id="fullName"
        type={"text"}
        placeholder="ادخل عنوان القسم"
        name={"fullName"}
        defaultValue={fullName}
      />
      <Label htmlFor="phone">رقم الهاتف </Label>

      <InputValidator
        id="phone"
        type={"tel"}
        placeholder={"رقم الهاتف"}
        name={"phone"}
        defaultValue={phone}
      />
      <Label htmlFor="password">كلمة السر </Label>
      <Input
        id="password"
        type={"tel"}
        placeholder={"كلمة السر"}
        name={"password"}
      />

      <Label>المحتوى</Label>
      <Editor content={body} onChange={setBody} />

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
            <h3>تحميل الصورة الشخصية </h3>
            <UploadDropzone
              endpoint="imageUploader"
              content={{
                label: "تحميل الصورة الشخصية واضحة لوجهك",
                button: "اختر ملفا",
              }}
              onClientUploadComplete={(res) => {
                setImage(res[0].url ?? "");
                toast({ title: "تم الرفع بنجاح" });
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
        )}
        {cv ? (
          <div className="w-[200px] h-[200px] rounded-lg overflow-hidden relative">
            <Suspense fallback={<Skeleton className="w-full h-full" />}>
              <>
                <Button
                  type={"button"}
                  onClick={(e) => {
                    e.preventDefault();
                    setCv("");
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
            <h3>تحميل (cv)</h3>
            <UploadDropzone
              endpoint="pdfUploader"
              content={{ label: "تحميل (cv)", button: "اختيار cv" }}
              onClientUploadComplete={(res) => {
                console.log(res);
                setCv(res[0].url ?? "");
                toast({ title: "تم الرفع بنجاح" });
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
        )}
      </div>
      <SubmitButton>
        <FaSave className="mr-2 h-4 w-4" />
        حفظ
      </SubmitButton>
    </Form>
  );
};

export default UpdateTeacherForm;
