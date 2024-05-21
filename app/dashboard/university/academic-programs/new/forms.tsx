"use client";

import Form from "@/app/components/form";
import {
  deleteCenterAction,
  editCenterAction,
  newCenterAction,
} from "../actions";
import SubmitButton from "@/app/components/custom-sumbit-btn";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Editor from "@/app/components/editor";
import LangTabs from "@/app/components/tabs";

export const NewForm = () => {
  const [body, setBody] = useState<string>("");
  const [enBody, setEnBody] = useState<string>("");

  return (
    <Form
      className="my-2 px-4 "
      action={newCenterAction}
      replaceLink={`/dashboard/university/academic-programs`}
    >
      <LangTabs
        ar={
          <>
            <Input value={body} type={"hidden"} name="body" />

            <div className="my-2">
              <Label htmlFor="title">عنوان البرنامج الأكاديمي</Label>
              <Input
                type={"text"}
                className="sm:w-1/2 lg:w-1/4"
                name="title"
                id="title"
                placeholder="العنوان هنا"
              />
            </div>
            <Editor content={body} onChange={setBody} />
          </>
        }
        en={
          <>
            <Input value={enBody} type={"hidden"} name="enbody" />
            <div className="my-2">
              <Label htmlFor="entitle">academic program title</Label>
              <Input
                type={"text"}
                className="sm:w-1/2 lg:w-1/4"
                name="entitle"
                id="entitle"
                placeholder="academic program title"
              />
            </div>
            <Editor content={enBody} onChange={setEnBody} />
          </>
        }
      />
      <SubmitButton className="w-full md:w-1/4" type={"submit"}>
        حفظ
      </SubmitButton>
      <Separator />
    </Form>
  );
};

export const EditCenterForm = ({
  body: oldBody = "",
  enBody: oldEnBody = "",
  enTitle = "",
  title = "",
  centerId,
  arId,
  enId,
}: {
  body?: string;
  enBody?: string;
  title?: string;
  centerId: string;
  enTitle?: string;
  arId: string;
  enId: string;
}) => {
  const [body, setBody] = useState<string>(oldBody);
  const [enBody, setEnBody] = useState<string>(oldEnBody);

  return (
    <Form
      className="my-2 px-4"
      action={editCenterAction}
      replaceLink={`/dashboard/university/academic-programs/${centerId}`}
    >
      <Input type={"hidden"} name="centerId" value={centerId} />
      <Input type={"hidden"} name="arId" value={arId} />
      <Input type={"hidden"} name="enId" value={enId} />
      <LangTabs
        ar={
          <>
            <Input value={body} type={"hidden"} name="body" />

            <div className="my-2">
              <Label htmlFor="title">عنوان البرنامج الأكاديمي</Label>
              <Input
                defaultValue={title}
                type={"text"}
                className="sm:w-1/2 lg:w-1/4"
                name="title"
                id="title"
                placeholder="العنوان هنا"
              />
            </div>
            <Editor content={body} onChange={setBody} />
          </>
        }
        en={
          <>
            <Input value={enBody} type={"hidden"} name="enbody" />
            <div className="my-2">
              <Label htmlFor="entitle">academic program title</Label>
              <Input
                defaultValue={enTitle}
                type={"text"}
                className="sm:w-1/2 lg:w-1/4"
                name="entitle"
                id="entitle"
                placeholder="academic program title"
              />
            </div>
            <Editor content={enBody} onChange={setEnBody} />
          </>
        }
      />

      {/* image  */}
      <Separator />
      <SubmitButton className="w-full md:w-1/4" type={"submit"}>
        تعديل
      </SubmitButton>
    </Form>
  );
};

export const DeleteCenterForm = ({
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
      action={deleteCenterAction}
      replaceLink={`/dashboard/university/academic-programs`}
    >
      <Input type={"hidden"} name="centerId" value={id} />
      <Input type={"hidden"} name="arId" value={arId} />
      <Input type={"hidden"} name="enId" value={enId} />
      <SubmitButton className="w-full bg-red-500 hover:bg-red-400">
        حذف
      </SubmitButton>
    </Form>
  );
};

export default DeleteCenterForm;
