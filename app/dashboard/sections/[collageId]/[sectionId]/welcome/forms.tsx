"use client";

import Form from "@/app/components/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { editWelcomeAction } from "./action";
import SubmitButton from "@/app/components/custom-sumbit-btn";

const EditWelcome = ({ id }: { id: string }) => {
  return (
    <Form
      action={editWelcomeAction}
      replaceLink={`/dashboard/collages/${id}/welcome`}
    >
      <Input
        placeholder="المحتوى"
        type="text"
        name="content"
        className="my-2"
      />
      <Input
        placeholder="content"
        type="text"
        name="encontent"
        className="my-2"
      />
      <input type="hidden" name="id" value={id} />
      <SubmitButton>تعديل </SubmitButton>
    </Form>
  );
};

export default EditWelcome;
