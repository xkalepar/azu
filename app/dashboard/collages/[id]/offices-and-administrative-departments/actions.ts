import { deleteNews, editNews, newNews } from "@/prisma/seed";
import { z } from "zod";
import { createData, deleteData, updateData } from "./seed";

export async function createDataAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      title: z.string(),
      entitle: z.string(),
      body: z.string(),
      enbody: z.string(),
      collageId: z.string(),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      title: formData.get("title"),
      entitle: formData.get("entitle"),
      body: formData.get("body"),
      enbody: formData.get("enbody"),
      collageId: formData.get("collageId"),
    });
    console.log(data);

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }
    console.log(data);
    const {
      collageId,
      body,
      enbody: enBody,
      entitle: enTitle,
      title,
    } = data.data;
    const res = await createData({
      collageId,
      title,
      body,
      enTitle,
      enBody,
    });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
export async function updateDataAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      title: z.string(),
      entitle: z.string(),
      body: z.string(),
      enbody: z.string(),
      pageId: z.string(),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      title: formData.get("title"),
      entitle: formData.get("entitle"),
      body: formData.get("body"),
      enbody: formData.get("enbody"),
      pageId: formData.get("pageId"),
    });
    console.log(data);

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }
    console.log(data);
    const { body, title, pageId, enbody, entitle } = data.data;
    const res = await updateData({
      title,
      body,
      enBody: enbody,
      enTitle: entitle,
      pageId,
    });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
export async function deleteDataAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      pageId: z.string(),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      pageId: formData.get("pageId"),
    });

    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }

    const { pageId } = data.data;
    const res = await deleteData({
      pageId,
    });

    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
