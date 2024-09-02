"use client";

import Form from "@/app/components/form";
import { newUserAction } from "../actions";
import SubmitButton from "@/app/components/custom-sumbit-btn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import InputValidator from "@/app/[lang]/components/phone-input";

export const CreateTeacher = () => {
  const { collageId, sectionId } = useParams();

  return (
    <Form
      sucess={"تمت العملية بنجاح"}
      className="my-2 px-4 "
      action={newUserAction}
      replaceLink={`/dashboard/sections/${collageId}/${sectionId}/teachers`}
    >
      <input type={"hidden"} name="sectionId" value={sectionId} />
      <input type={"hidden"} name="collageId" value={collageId} />
      <div className=" grid sm:grid-cols-2 gap-4 my-2">
        <div className="">
          <Label htmlFor="fullName">الاسم بالكامل</Label>
          <Input
            type={"text"}
            name="fullName"
            id="fullName"
            placeholder="ادخل اسم عضو هيئة التدريس"
          />
        </div>
        <div className="">
          <Label htmlFor="phone">رقم الهاتف</Label>

          <InputValidator
            type={"number"}
            name="phone"
            id="phone"
            placeholder="ادخل رقم عضو هيئة التدريس"
          />
        </div>
        <div className="">
          <Label htmlFor="password">كلمة السر</Label>
          <Input
            type={"text"}
            name="password"
            id="password"
            placeholder="انشئ كلمة المرور لعضو هيئة التدريس"
          />
        </div>
      </div>

      <SubmitButton className="w-full md:w-1/4" type={"submit"}>
        حفظ
      </SubmitButton>
    </Form>
  );
};
