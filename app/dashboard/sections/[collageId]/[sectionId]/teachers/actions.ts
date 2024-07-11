import { z } from "zod";
import { createUser } from "./seed";
// import { createMagazine, deleteMagazine, updateMagazine } from "./seed";

export async function newUserAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      image: z.string().optional().nullable(),
      fullName: z.string().min(2),
      password: z.string(),
      phone: z.string(),
      content: z.string().optional().nullable(),
      cv: z.string().optional().nullable(),
      acadamicCondtion: z.string().optional().nullable(),
      role: z
        .enum(["admin", "teacher", "student", "superAdmin"])
        .optional()
        .nullable(),
      collageId: z.string(),
      sectionId: z.string(),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      image: formData.get("image"),
      fullName: formData.get("fullName"),
      password: formData.get("password"),
      phone: formData.get("phone"),
      content: formData.get("content"),
      cv: formData.get("cv"),
      acadamicCondtion: formData.get("acadamicCondtion"),
      role: formData.get("role"),
      collageId: formData.get("collageId"),
      sectionId: formData.get("sectionId"),
    });
    console.log(data);

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }
    console.log(data);
    const {
      fullName,
      image,
      password,
      phone,
      acadamicCondtion,
      content,
      cv,
      role,
      collageId,
      sectionId,
    } = data.data;
    const res = await createUser({
      fullName,
      password,
      phone: Number(phone),
      role: role ?? "teacher",
      acadamicCondtion,
      cv,
      image,
      content,
      sectionId,
      collageId,
    });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
/* export async function editMagazineAction(
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
} */
