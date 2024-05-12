"use client";
import ResponsiveDialog from "@/app/[lang]/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import Form from "@/app/components/form";
import SubmitButton from "@/app/components/custom-sumbit-btn";
import { Trash } from "lucide-react";
import { deleteFormAction } from "../../action";
const DeleteForm = ({
  id,
  arId,
  enId,
  title,
  redirectTo,
}: {
  title?: string | null;
  id: string;
  arId: string | null;
  enId: string | null;
  redirectTo: string;
}) => {
  return (
    <ResponsiveDialog
      trigger={
        <Button variant={"ghost"} size={"icon"}>
          <Trash size={14} />
        </Button>
      }
      dialogTitle={title ?? ""}
    >
      <div>
        <p>هل أنت متأكد من حذف {title}</p>
        <Form replaceLink={redirectTo} action={deleteFormAction}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="arId" value={arId ?? ""} />
          <input type="hidden" name="enId" value={enId ?? ""} />
          <SubmitButton variant={"outline"}>حذف</SubmitButton>
        </Form>
      </div>
    </ResponsiveDialog>
  );
};

export default DeleteForm;
