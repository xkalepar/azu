"use client"
import Form from "@/app/components/form";
import SubmitButton from "@/app/components/custom-sumbit-btn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { newUserAction } from "../../sections/[collageId]/[sectionId]/teachers/actions";
import { ReactNode } from "react";
import ResponiseDialog from "@/app/[lang]/components/responsive-dialog";
import { Button } from "@/components/ui/button";
// import { SelectCollage } from "./select-collage";


export const CreateAdmin = ({ children }: { children: ReactNode }) => (
    <ResponiseDialog trigger={<>
        <div>
            مشرف جديد
        </div>
    </>}

    >

        <Form
            sucess={"تمت العملية بنجاح"}
            className="my-2 px-4 "
            action={newUserAction}
        >
            <div className=" grid sm:grid-cols-2 gap-4 my-2">

                <div className="">
                    <Label htmlFor="fullName">الاسم بالكامل</Label>
                    <Input
                        type={"text"}
                        name="fullName"
                        id="fullName"
                        placeholder="ادخل اسم المشرف"
                    />
                </div>
                <div className="">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input
                        type={"number"}
                        name="phone"
                        id="phone"
                        placeholder="ادخل رقم المشرف"
                    />
                </div>
                <div className="">
                    <Label htmlFor="password">كلمة السر</Label>
                    <Input
                        type={"text"}
                        name="password"
                        id="password"
                        placeholder="انشئ كلمة السر"
                    />
                </div>
            </div>
            {children}
            {/* <SelectCollage /> */}
            <SubmitButton className="w-full md:w-1/4" type={"submit"}>
                حفظ
            </SubmitButton>

        </Form>
    </ResponiseDialog>
);
