// import { verifyOrder } from "@/lib/vanex";
import { newCollage } from "@/prisma/seed";
import { Category } from "@prisma/client";
import { z } from "zod";

export async function newCollageAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    // get data form the form
    const schema = z.object({
      logo: z.string().url(),
      name: z.string().min(2),
      origin: z.string().min(2),
      goals: z.string().min(2),
      rating: z.string().min(2),
      management: z.string().min(2),
      desk: z.string().min(2),
      shoan: z.string().min(2),
      structure: z.string().min(2),
      list: z.string(),
      enname: z.string().min(2),
      enorigin: z.string().min(2),
      engoals: z.string().min(2),
      enrating: z.string().min(2),
      enmanagement: z.string().min(2),
      endesk: z.string().min(2),
      enshoan: z.string().min(2),
      enstructure: z.string().min(2),
      enlist: z.string(),
      category: z.string(),
    });

    const data = schema.safeParse({
      logo: formData.get("logo"),
      name: formData.get("name"),
      origin: formData.get("origin"),
      goals: formData.get("goals"),
      rating: formData.get("rating"),
      management: formData.get("management"),
      desk: formData.get("desk"),
      shoan: formData.get("shoan"),
      structure: formData.get("structure"),
      list: formData.get("list"),
      enname: formData.get("enname"),
      enorigin: formData.get("enorigin"),
      engoals: formData.get("engoals"),
      enrating: formData.get("enrating"),
      enmanagement: formData.get("enmanagement"),
      endesk: formData.get("endesk"),
      enshoan: formData.get("enshoan"),
      enstructure: formData.get("enstructure"),
      enlist: formData.get("enlist"),
      category: formData.get("category"),
    });
    console.log(data.success);
    console.log(data);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول " };
    }
    const res = await newCollage({
      arProps: {
        desk: data.data.desk,
        goals: data.data.goals,
        id: "",
        management: data.data.management,
        name: data.data.name,
        origin: data.data.origin,
        rating: data.data.rating,
        shoan: data.data.shoan,
        structure: data.data.structure,
      },
      enProps: {
        desk: data.data.endesk,
        goals: data.data.engoals,
        id: "",
        management: data.data.enmanagement,
        name: data.data.enname,
        origin: data.data.enorigin,
        rating: data.data.enrating,
        shoan: data.data.enshoan,
        structure: data.data.enstructure,
      },
      list: JSON.parse(data.data.list),
      enList: JSON.parse(data.data.enlist),
      logo: data.data.logo,
      category: data.data.category as Category,
    });
    // revalidatePath("/");

    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
