"use client"
import Form from "@/app/components/form";
import SubmitButton from "@/app/components/custom-sumbit-btn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteUserAction, newUserAction } from "../../sections/[collageId]/[sectionId]/teachers/actions";
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { TrashIcon } from "@radix-ui/react-icons";
// import ResponiseDialog from "@/app/[lang]/components/responsive-dialog";

export const CreateAdmin = ({ children }: { children: ReactNode }) => (
    <Form
        sucess={"تمت العملية بنجاح"}
        className="my-2 px-4 "
        replaceLink="/dashboard/users"
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
        <input type={"hidden"} name="role" value={"admin"} />
        {children}
        <SubmitButton className="w-full md:w-1/4" type={"submit"}>
            حفظ
        </SubmitButton>

    </Form>
);
export const DeleteUserForm = ({ userId, children }: { userId: string, children?: ReactNode }) => (
    <Dialog>
        <DialogTrigger>
            <TrashIcon></TrashIcon>
        </DialogTrigger>
        <DialogContent>
            <DialogDescription>
                هل أنت متأكد من حذف: {children}
            </DialogDescription>
            <Form
                sucess={"تمت العملية بنجاح"}
                className="my-2 px-4 "
                replaceLink="#"
                action={deleteUserAction}
            >

                <input type={"hidden"} name="id" value={userId} />

                <SubmitButton className="w-full md:w-1/4" type={"submit"}>
                    حذف
                </SubmitButton>

            </Form>
        </DialogContent>
    </Dialog>
);
