// import { verifyOrder } from "@/lib/vanex";
import { deleteNews, editNews, newNews } from "./seed";
import { z } from "zod";

export async function newNewsAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      image: z.string().url(),
      title: z.string(),
      entitle: z.string(),
      body: z.string(),
      enbody: z.string(),
      collageId: z.string(),
      sectionId: z.string(),
      arId: z.string(),
      enId: z.string(),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      image: formData.get("image"),
      title: formData.get("title"),
      entitle: formData.get("entitle"),
      body: formData.get("body"),
      enbody: formData.get("enbody"),
      collageId: formData.get("collageId"),
      sectionId: formData.get("sectionId"),
      arId: formData.get("arId"),
      enId: formData.get("enId"),
    });
    console.log(data);

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }
    console.log(data);
    const { collageId, body, enbody, entitle, image, title, sectionId } =
      data.data;
    const res = await newNews({
      collageId,
      sectionId,
      image,
      arContent: {
        title: title,
        body: body,
      },
      enContent: {
        title: entitle,
        body: enbody,
      },
    });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
export async function editNewsAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      image: z.string().url(),
      title: z.string(),
      entitle: z.string(),
      body: z.string(),
      enbody: z.string(),
      collageId: z.string(),
      newsId: z.string(),
      arId: z.string(),
      enId: z.string(),
      sectionId: z.string(),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      image: formData.get("image"),
      title: formData.get("title"),
      entitle: formData.get("entitle"),
      body: formData.get("body"),
      enbody: formData.get("enbody"),
      collageId: formData.get("collageId"),
      newsId: formData.get("newsId"),
      arId: formData.get("arId"),
      enId: formData.get("enId"),
      sectionId: formData.get("sectionId"),
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
      enbody,
      entitle,
      image,
      title,
      newsId,
      arId,
      enId,
      sectionId,
    } = data.data;
    const res = await editNews({
      arId,
      enId,
      newsId,
      image,
      arContent: {
        title: title,
        body: body,
      },
      enContent: {
        title: entitle,
        body: enbody,
      },
    });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
export async function deleteNewsAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
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
    // console.log(data);

    // console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }
    // console.log(data);
    const { id, arId, enId } = data.data;
    const res = await deleteNews({
      id,
      arId,
      enId,
    });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
