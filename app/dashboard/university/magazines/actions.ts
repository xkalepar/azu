// import { verifyOrder } from "@/lib/vanex";
import { deleteNewsUni, editNewsUni, newNewsUni } from "@/prisma/seed";
import { z } from "zod";
import { createMagazine, deleteMagazine, updateMagazine } from "./seed";

export async function newMagazineAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      image: z.string().url(),
      pdf: z.string().url(),
      title: z.string(),
      entitle: z.string(),
      body: z.string(),
      enbody: z.string(),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      image: formData.get("image"),
      pdf: formData.get("pdf"),
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
    const { body, enbody, entitle, title, pdf, image } = data.data;
    const res = await createMagazine({
      pdfUri: pdf,

      logo: image,

      arContent: {
        id: "",
        title: title,
        body: body,
      },
      enContent: {
        id: "",
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
export async function editMagazineAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      image: z.string().url(),
      pdf: z.string().url(),
      title: z.string(),
      entitle: z.string(),
      body: z.string(),
      enbody: z.string(),
      magazineId: z.string(),
      arId: z.string(),
      enId: z.string(),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      pdf: formData.get("pdf"),
      image: formData.get("image"),
      title: formData.get("title"),
      entitle: formData.get("entitle"),
      body: formData.get("body"),
      enbody: formData.get("enbody"),
      magazineId: formData.get("magazineId"),
      arId: formData.get("arId"),
      enId: formData.get("enId"),
    });
    console.log(data);

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }
    console.log(data);
    const { body, enbody, entitle, image, pdf, title, magazineId, arId, enId } =
      data.data;
    const res = await updateMagazine({
      id: magazineId,
      data: {
        pdfUri: pdf,
        logo: image,
        arContent: {
          id: arId,
          title: title,
          body: body,
        },
        enContent: {
          id: enId,
          title: entitle,
          body: enbody,
        },
      },
    });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
export async function deleteMagazineAction(
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
      enId: formData.get("enId"),
      arId: formData.get("arId"),
    });
    // console.log(data);

    // console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }
    // console.log(data);
    const { arId, enId, id } = data.data;
    const res = await deleteMagazine({
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
