"use server";

import prisma from "@/prisma/db";
import { revalidatePath, revalidateTag } from "next/cache";

interface newProps {
  encontent: string;
  content: string;
  id: string;
}

export const editWelcome = async ({
  id,
  encontent,
  content,
}: newProps): Promise<{
  message: string;
}> => {
  try {
    const newData = await prisma.scientificSection.update({
      where: { id },
      data: {
        welcome: content,
        enWelcome: encontent,
      },
    });
    if (!newData) {
      return { message: "فشل حفظ البيانات" };
    }
    revalidateTag("sections");
    revalidatePath("/");
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    console.log(error);
    return { message: "فشلت العملية" };
  }
};
