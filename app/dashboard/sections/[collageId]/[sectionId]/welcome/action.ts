import { z } from "zod";
import { editWelcome } from "./seed";

export async function editWelcomeAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    // get data form the form
    const schema = z.object({
      content: z.string().min(2),
      encontent: z.string().min(2),
      id: z.string().min(2),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      content: formData.get("content"),
      encontent: formData.get("encontent"),
      id: formData.get("id"),
    });
    console.log(`data: ${data}`);

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول " };
    }
    console.log(data);
    const { content, encontent, id } = data.data;
    const res = await editWelcome({
      id,
      content,
      encontent,
    });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
