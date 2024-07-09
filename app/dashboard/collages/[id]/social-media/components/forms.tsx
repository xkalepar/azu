"use client"

import SubmitButton from "@/app/components/custom-sumbit-btn";
import Form from "@/app/components/form";
import { Input } from "@/components/ui/input";
import { updateSocialAction } from "../action";

interface Props {
    socialType:
    | "facebook"
    | "whatsapp"
    | "youtube"
    | "email"
    | "telegram"
    | "phone1"
    | "phone2"
    | "fax"
    | "x"
    | "address"
    | "location";
    collageId: string
}
export const UpdateTheLink = (
    { socialType, collageId }: Props
) => {
    return <Form replaceLink="#" action={updateSocialAction}>
        <Input type={"text"} name="value" className="my-2" />

        <input type={"hidden"} name="collageId" value={collageId} />
        <input type={"hidden"} name="type" value={socialType} />
        <SubmitButton>
            حفظ
        </SubmitButton>
    </Form>
}
