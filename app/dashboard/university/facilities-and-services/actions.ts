// import { verifyOrder } from "@/lib/vanex";
import { deleteNewsUni, editNewsUni, newNewsUni } from "@/prisma/seed";
import { z } from "zod";
import { createCenter, deleteCenter, editCenter } from "./seed";

export async function newCenterAction(
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
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
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
    const { body, enbody, entitle, title } = data.data;
    const res = await createCenter({
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
export async function editCenterAction(
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
      centerId: z.string(),
      arId: z.string(),
      enId: z.string(),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      title: formData.get("title"),
      entitle: formData.get("entitle"),
      body: formData.get("body"),
      enbody: formData.get("enbody"),
      centerId: formData.get("centerId"),
      arId: formData.get("arId"),
      enId: formData.get("enId"),
    });
    console.log(data);

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }
    console.log(data);
    const { body, enbody, entitle, title, centerId, arId, enId } = data.data;
    const res = await editCenter({
      arId,
      centerId,
      enId,
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
export async function deleteCenterAction(
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
      id: formData.get("centerId"),
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
    const res = await deleteCenter({
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
