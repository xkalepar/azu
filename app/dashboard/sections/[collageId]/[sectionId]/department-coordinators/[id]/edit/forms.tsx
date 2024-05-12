"use client";
import SubmitButton from "@/app/components/custom-sumbit-btn";
import Editor from "@/app/components/editor";
import Form from "@/app/components/form";
import LangTabs from "@/app/components/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { editFormAction, newFormAction } from "../../action";
import { Edit2 } from "lucide-react";
interface Props {
  sectionId: string;
  collageId: string;
  id: string;
  content?: string;
  enContent?: string;
  title?: string;
  entitle?: string;
  arId: string;
  enId: string;
}
const EditForm = ({
  sectionId,
  collageId,
  id,
  content: body,
  enContent: enbody,
  title,
  entitle,
  arId,
  enId,
}: Props) => {
  console.log("first");
  console.log(`id:${id}`);
  console.log("two");
  // console.log(title);

  const [content, setContent] = useState<string>(body ?? "");
  const [enContent, setEnContent] = useState<string>(enbody ?? "");
  return (
    <section>
      <Form
        className="px-2"
        action={editFormAction}
        replaceLink={`/dashboard/sections/${collageId}/${sectionId}/department-coordinators/${id}`}
      >
        <Input type="hidden" name="dataId" value={id} />
        <Input type="hidden" name="arId" value={arId} />
        <Input type="hidden" name="enId" value={enId} />
        <LangTabs
          ar={
            <div dir="rtl">
              <div className="flex-1">
                <Input type={"hidden"} value={enContent} name="encontent" />

                <Label htmlFor="title">عنوان منسقي القسم</Label>
                <Input
                  defaultValue={title}
                  id="title"
                  type={"text"}
                  placeholder="ادخل عنوان القسم"
                  name={"title"}
                />
              </div>

              <div className="flex-1 my-2">
                <Label htmlFor="content">محتويات منسقي القسم</Label>
                <Input type={"hidden"} value={content} name="content" />
                <Editor content={content} onChange={setContent} />
              </div>
            </div>
          }
          en={
            <div dir="ltr">
              <div className="flex-1">
                <Input type={"hidden"} value={content} name="content" />
                <Label htmlFor="entitle">Title of the Section</Label>
                <Input
                  defaultValue={entitle}
                  id="entitle"
                  type={"text"}
                  placeholder="Enter the title of the Section"
                  name={"entitle"}
                />
              </div>

              <div className="flex-1">
                <Label htmlFor="encontent">Foundation of the college</Label>
                <Input type={"hidden"} value={enContent} name="encontent" />
                <Editor onChange={setEnContent} content={enContent} />
              </div>
            </div>
          }
        />

        <SubmitButton className="w-full my-1 sm:w-fit">
          <Edit2 className="mr-2 h-4 w-4" />
          تعديل
        </SubmitButton>
      </Form>
    </section>
  );
};

export default EditForm;
