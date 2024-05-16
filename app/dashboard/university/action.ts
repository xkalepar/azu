import { editUniversity } from "@/prisma/seed";
import { z } from "zod";

export async function editUniversityAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    // get data form the form
    const schema = z.object({
      name: z.string().min(2),
      enname: z.string().min(2),
      content: z.string().min(2),
      encontent: z.string().min(2),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      name: formData.get("name"),
      enname: formData.get("enname"),
      content: formData.get("content"),
      encontent: formData.get("encontent"),
    });
    console.log(`data: ${data}`);

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول " };
    }
    console.log(data);
    const { content, encontent, enname, name } = data.data;
    const res = await editUniversity({
      body: content,
      title: name,
      enBody: encontent,
      enTitle: enname,
    });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
