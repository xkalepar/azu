// import { verifyOrder } from "@/lib/vanex";
import { deleteCollage, newCollage, updateCollage } from "@/prisma/seed";
import { Category } from "@prisma/client";
import { z } from "zod";

export async function newCollageAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    // get data form the form
    const schema = z.object({
      logo: z.string().url(),
      name: z.string().min(2),
      enname: z.string().min(2),
      content: z.string().min(2),
      encontent: z.string().min(2),

      category: z.string(),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      logo: formData.get("logo"),
      name: formData.get("name"),
      enname: formData.get("enname"),
      content: formData.get("content"),
      encontent: formData.get("encontent"),
      category: formData.get("category"),
    });
    console.log(`data: ${data}`);

    console.log(data.success);
    // console.log(data);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول " };
    }
    console.log(data);
    const res = await newCollage({
      arProps: {
        content: data.data.content,
        title: data.data.name,
        id: "",
      },
      enProps: {
        id: "",
        title: data.data.enname,
        content: data.data.encontent,
      },
      logo: data.data.logo,
      category: data.data.category as Category,
      welcome: "",
    });
    // revalidatePath("/");

    // return { message: "ok" };
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
export async function editCollageAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    // get data form the form
    const schema = z.object({
      logo: z.string().url(),
      name: z.string().min(2),
      enname: z.string().min(2),
      content: z.string().min(2),
      encontent: z.string().min(2),
      collageId: z.string().min(2),
      arId: z.string().min(2),
      enId: z.string().min(2),
      category: z.string(),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      logo: formData.get("logo"),
      name: formData.get("name"),
      enname: formData.get("enname"),
      content: formData.get("content"),
      encontent: formData.get("encontent"),
      category: formData.get("category"),
      collageId: formData.get("collageId"),
      arId: formData.get("arId"),
      enId: formData.get("enId"),
    });
    console.log(`data: ${data}`);

    console.log(data.success);
    // console.log(data);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول " };
    }
    console.log(data);
    const { arId, collageId, enId, logo } = data.data;
    const res = await updateCollage({
      arProps: {
        content: data.data.content,
        title: data.data.name,
        id: "",
      },
      enProps: {
        id: "",
        title: data.data.enname,
        content: data.data.encontent,
      },
      logo,
      category: data.data.category as Category,
      welcome: "",
      arId,
      collageId,
      enId,
    });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}

export async function deleteCollageAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    // get data form the form
    const schema = z.object({
      collageId: z.string().min(2),
      arId: z.string().min(2),
      enId: z.string().min(2),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      collageId: formData.get("collageId"),
      arId: formData.get("arId"),
      enId: formData.get("enId"),
    });
    console.log(`data: ${data}`);

    console.log(data.success);
    // console.log(data);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول " };
    }
    console.log(data);
    const { arId, collageId, enId } = data.data;
    const res = await deleteCollage({
      arId,
      collageId,
      enId,
    });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
