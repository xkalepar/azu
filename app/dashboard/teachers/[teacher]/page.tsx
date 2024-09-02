import { getSession } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import React from "react";
import { getUserById } from "../../sections/[collageId]/[sectionId]/teachers/seed";
import UpdateTeacherForm from "./form";

const pages = async ({
  params: { teacher: id },
}: {
  params: { teacher: string };
}) => {
  console.log("id " + id);
  const user = await getSession();
  const teacher = await getUserById({ userId: id });
  console.log(teacher);
  if (!teacher) {
    return notFound();
  }
  if (!user) {
    redirect("/login");
  }
  if (user.role !== "teacher") {
    if (user.role === "superAdmin") {
      redirect("/dashboard/users");
    } else if (user.role === "admin") {
      redirect(`/dashboard/collages/${user.collageId}`);
    } else {
      redirect("login");
    }
  }
  const { acadamicCondtion, content, cv, fullName, image, phone } = teacher;

  return (
    <main className=" container py-4" dir="rtl">
      <h1 className=" font-bold text-xl ">
        تعديل بيانات : {teacher?.fullName}
      </h1>
      <UpdateTeacherForm
        fullName={fullName}
        content={content}
        acadamicCondtion={acadamicCondtion}
        cv={cv}
        image={image}
        phone={phone}
      />
    </main>
  );
};

export default pages;
