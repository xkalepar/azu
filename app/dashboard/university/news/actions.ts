// import { verifyOrder } from "@/lib/vanex";
import { deleteNewsUni, editNewsUni, newNewsUni } from "@/prisma/seed";
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
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      image: formData.get("image"),
      title: formData.get("title"),
      entitle: formData.get("entitle"),
      body: formData.get("body"),
      enbody: formData.get("enbody"),
    });
    console.log(data);

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }
    console.log(data);
    const { body, enbody, entitle, image, title } = data.data;
    const res = await newNewsUni({
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
      newsId: z.string(),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      image: formData.get("image"),
      title: formData.get("title"),
      entitle: formData.get("entitle"),
      body: formData.get("body"),
      enbody: formData.get("enbody"),
      newsId: formData.get("newsId"),
    });
    console.log(data);

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }
    console.log(data);
    const { body, enbody, entitle, image, title, newsId } = data.data;
    const res = await editNewsUni({
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
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      id: formData.get("id"),
    });
    // console.log(data);

    // console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }
    // console.log(data);
    const { id } = data.data;
    const res = await deleteNewsUni({
      id,
    });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
