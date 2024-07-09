"use client";

import Form from "@/app/components/form"; import SubmitButton from "@/app/components/custom-sumbit-btn";
import { Suspense, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { MdOutlineCancel } from "react-icons/md";
import Image from "next/image";
import { UploadButton } from "@/app/dashboard/components/upload";
import { toast } from "@/components/ui/use-toast";
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

export const EditNewsForm = ({
    collageId,
    image: oldImage = "",
    body: oldBody = "",
    enBody: oldEnBody = "",
    enTitle = "",
    title = "",
    newsId,
}: {
    image: string;
    collageId: string;
    body?: string;
    enBody?: string;
    title?: string;
    newsId: string;
    enTitle?: string;
}) => {
    const [image, setImage] = useState<string>(oldImage);
    const [body, setBody] = useState<string>(oldBody);
    const [enBody, setEnBody] = useState<string>(oldEnBody);

    return (
        <Form
            className="my-2 px-4"
            action={updateDataAction}
            replaceLink={`/dashboard/collages/${collageId}/offices-and-administrative-departments`}
        >
            <Input type={"hidden"} name="newsId" value={newsId} />
            <Input type={"hidden"} name="collageId" value={collageId} />
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
                    <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            setImage(res[0].url ?? "");
                            toast({ title: "uploaded successfully" });
                        }}
                        onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`);
                        }}
                    />
                )}

                <SubmitButton className="w-full md:w-1/4" type={"submit"}>
                    تعديل
                </SubmitButton>
            </div>
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
            <Input value={image} type={"hidden"} name="image" />
            <Separator />
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
