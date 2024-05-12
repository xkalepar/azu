"use client";
import SubmitButton from "@/app/components/custom-sumbit-btn";
import Editor from "@/app/components/editor";
import Form from "@/app/components/form";
import LangTabs from "@/app/components/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import { newFormAction } from "../action";
const NewForm = ({
  sectionId,
  collageId,
}: {
  sectionId: string;
  collageId: string;
}) => {
  const [content, setContent] = useState<string>("");
  const [enContent, setEnContent] = useState<string>("");
  return (
    <section>
      <Form
        className="px-2"
        action={newFormAction}
        replaceLink={`/dashboard/sections/${collageId}/${sectionId}/department-coordinators`}
      >
        <Input type="hidden" name="sectionId" value={sectionId} />
        <LangTabs
          ar={
            <div dir="rtl">
              <div className="flex-1">
                <Input type={"hidden"} value={enContent} name="encontent" />

                <Label htmlFor="title">عنوان منسقي القسم</Label>
                <Input
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
          <FaSave className="mr-2 h-4 w-4" />
          حفظ
        </SubmitButton>
      </Form>
    </section>
  );
};

export default NewForm;
