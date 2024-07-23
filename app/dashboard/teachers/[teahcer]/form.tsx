"use client";
import SubmitButton from "@/app/components/custom-sumbit-btn";
import Editor from "@/app/components/editor";
import Form from "@/app/components/form";
import LangTabs from "@/app/components/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import { newUserAction, updateUserAction } from "../../sections/[collageId]/[sectionId]/teachers/actions";

const NewSectionForm = ({ collageId }: { collageId: string }) => {

    const [content, setContent] = useState<string>("");
    const [enContent, setEnContent] = useState<string>("");
    /* 
      
      userId: formData.get("userId"),
      image: formData.get("image"),
      fullName: formData.get("fullName"),
      password: formData.get("password"),
      phone: formData.get("phone"),
      content: formData.get("content"),
      cv: formData.get("cv"),
      acadamicCondtion: formData.get("acadamicCondtion"),
      role: formData.get("role"),
      collageId: formData.get("collageId"),
      sectionId: formData.get("sectionId"),
    
    */
    return (
        <section>
            <Form
                action={newUserAction}
                replaceLink={`/dashboard/sections/${collageId}`}
            >
                <Input type="hidden" name="collageId" value={collageId} />
                {/*  */}
                <Label htmlFor="title">عنوان القسم</Label>
                <Input
                    id="title"
                    type={"text"}
                    placeholder="ادخل عنوان القسم"
                    name={"title"}
                />

                <SubmitButton>
                    <FaSave className="mr-2 h-4 w-4" />
                    حفظ
                </SubmitButton>
            </Form>
        </section>
    );
};

export default NewSectionForm;
