import { newSection } from "@/prisma/seed";
import { z } from "zod";

export async function newSectionAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    // get data form the form
    const schema = z.object({
      collageId: z.string(),
      title: z.string().min(2),
      entitle: z.string().min(2),
      content: z.string().min(2),
      encontent: z.string().min(2),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      collageId: formData.get("collageId"),
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
    const res = await newSection({
      body: data.data.content,
      title: data.data.title,
      entitle: data.data.entitle,
      enbody: data.data.encontent,
      collageId: data.data.collageId,
    });
    // revalidatePath("/");

    // return { message: "ok" };
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
