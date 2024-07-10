"use client";

import Form from "@/app/components/form"; import SubmitButton from "@/app/components/custom-sumbit-btn";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Editor from "@/app/components/editor";
import LangTabs from "@/app/components/tabs";
import { createDataAction, deleteDataAction, updateDataAction } from "../actions";

interface NewsFormProps {
    collageId: string;
}
export const NewDataForm = ({ collageId }: NewsFormProps) => {
    const [body, setBody] = useState<string>("");
    const [enBody, setEnBody] = useState<string>("");

    return (
        <Form
            className="my-2 px-4 "
            action={createDataAction}
            replaceLink={`/dashboard/collages/${collageId}/offices-and-administrative-departments`}
        >
            <Input type={"hidden"} name="collageId" value={collageId} />
            <LangTabs
                ar={
                    <>
                        <Input value={body} type={"hidden"} name="body" />

                        <div className="my-2">
                            <Label htmlFor="title">عنوان المركز</Label>
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
                            <Label htmlFor="entitle">offices and administrative departments title</Label>
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

            <Separator />
            <SubmitButton className="w-full md:w-1/4" type={"submit"}>
                حفظ
            </SubmitButton>
        </Form>
    );
};

export const UpdateDataForm = ({
    collageId,
    body: oldBody = "",
    enBody: oldEnBody = "",
    enTitle = "",
    title = "",
    pageId,
}: {
    collageId: string;
    body?: string;
    enBody?: string;
    title?: string;
    pageId: string;
    enTitle?: string;
}) => {
    const [body, setBody] = useState<string>(oldBody);
    const [enBody, setEnBody] = useState<string>(oldEnBody);

    return (
        <Form
            className="my-2 px-4"
            action={updateDataAction}
            replaceLink={`/dashboard/collages/${collageId}/offices-and-administrative-departments`}
        >
            <Input type={"hidden"} name="pageId" value={pageId} />
            <Input type={"hidden"} name="collageId" value={collageId} />

            <LangTabs
                ar={
                    <>
                        <Input value={body} type={"hidden"} name="body" />

                        <div className="my-2">
                            <Label htmlFor="title">عنوان المركز</Label>
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
                            <Label htmlFor="entitle">offices-and-administrative-departments title</Label>
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

            {/* image  */}

            <SubmitButton className="w-full md:w-1/4" type={"submit"}>
                تعديل
            </SubmitButton>            <Separator />
        </Form>
    );
};

export const DeleteDataForm = ({
    id,
    pageId,
    collageId
}: {
    id: string;
    collageId: string;
    pageId: string;
}) => {
    return (
        <Form
            action={deleteDataAction}
            replaceLink={`/dashboard/collages/${collageId}/offices-and-administrative-departments`}
        >
            <Input type={"hidden"} name="id" value={id} />
            <Input type={"hidden"} name="pageId" value={pageId} />
            <SubmitButton className="w-full bg-red-500 hover:bg-red-400">
                حذف
            </SubmitButton>
        </Form>
    );
};

// export default DeleteNewsForm;

// export defa
