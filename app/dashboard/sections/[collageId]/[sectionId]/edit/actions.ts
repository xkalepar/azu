import { z } from "zod";
import { deleteSection, editSection } from "./seed";

export async function editSectionAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    // get data form the form
    const schema = z.object({
      sectionId: z.string(),
      title: z.string(),
      entitle: z.string(),
      content: z.string(),
      encontent: z.string(),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      sectionId: formData.get("sectionId"),
      title: formData.get("title"),
      entitle: formData.get("entitle"),
      content: formData.get("content"),
      encontent: formData.get("encontent"),
    });
    console.log(data);
    console.log(`data: ${data}`);

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول " };
    }
    console.log(data);
    const res = await editSection({
      body: data.data.content,
      title: data.data.title,
      entitle: data.data.entitle,
      enbody: data.data.encontent,
      sectionId: data.data.sectionId,
    });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
export async function deleteSectionAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    // get data form the form
    const schema = z.object({
      id: z.string(),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      id: formData.get("id"),
    });

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول " };
    }
    console.log(data);
    const { id } = data.data;
    const res = await deleteSection({
      id,
    });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
