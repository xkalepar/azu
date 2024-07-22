import { z } from "zod";
import { createUser } from "./seed";

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
      collageId: z.string().optional().nullable(),
      sectionId: z.string().optional().nullable(),
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
