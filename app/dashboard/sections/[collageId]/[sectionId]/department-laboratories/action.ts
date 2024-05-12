// import { verifyOrder } from "@/lib/vanex";
import { z } from "zod";
import {
  addSectionDepartmentCoordinatorsData,
  deleteSectionDepartmentCoordinatorsData,
  updateSectionDepartmentCoordinatorsData,
} from "./seed";
import { redirect } from "next/dist/server/api-utils";
export async function newFormAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  console.log("hi");
  try {
    // get data form the form
    console.log("first...");
    const schema = z.object({
      sectionId: z.string(),
      title: z.string().min(2),
      entitle: z.string().min(2),
      content: z.string().min(2),
      encontent: z.string().min(2),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      sectionId: formData.get("sectionId"),
      title: formData.get("title"),
      entitle: formData.get("entitle"),
      content: formData.get("content"),
      encontent: formData.get("encontent"),

      category: formData.get("category"),
    });
    console.log(data);
    console.log(`data: ${data}`);

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول " };
    }
    console.log(data);
    const res = await addSectionDepartmentCoordinatorsData({
      body: data.data.content,
      title: data.data.title,
      entitle: data.data.entitle,
      enbody: data.data.encontent,
      sectionId: data.data.sectionId,
    });
    // revalidatePath("/");

    // return { message: "ok" };
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
export async function editFormAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  console.log("hi");
  try {
    // get data form the form
    console.log("first...");
    const schema = z.object({
      dataId: z.string(),
      title: z.string().min(2),
      entitle: z.string().min(2),
      content: z.string().min(2),
      encontent: z.string().min(2),
      arId: z.string(),
      enId: z.string(),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      dataId: formData.get("dataId"),
      title: formData.get("title"),
      entitle: formData.get("entitle"),
      content: formData.get("content"),
      encontent: formData.get("encontent"),
      arId: formData.get("arId"),
      enId: formData.get("enId"),

      category: formData.get("category"),
    });
    console.log(data);
    console.log(`data: ${data}`);

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول " };
    }
    console.log(data);
    const { arId, content, dataId, enId, encontent, entitle, title } =
      data.data;
    const res = await updateSectionDepartmentCoordinatorsData({
      body: content,
      enbody: encontent,
      title,
      entitle,
      dataId,
      arId,
      enId,
    });
    // revalidatePath("/");

    // return { message: "ok" };
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}

export async function deleteFormAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  console.log("hi");
  try {
    // get data form the form
    console.log("first...");
    const schema = z.object({
      id: z.string(),
      arId: z.string(),
      enId: z.string(),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      id: formData.get("id"),
      arId: formData.get("arId"),
      enId: formData.get("enId"),
    });
    console.log(data);
    console.log(`data: ${data}`);

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول " };
    }
    console.log(data);
    const { arId, id, enId } = data.data;
    const res = await deleteSectionDepartmentCoordinatorsData({
      id,
      arId,
      enId,
    });
    // revalidatePath("/");
    //  redirect('/')
    // return { message: "ok" };
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
