"use server";

import prisma from "@/prisma/db";
import { revalidatePath, revalidateTag } from "next/cache";

interface newNewsProps {
  image: string;
  arContent: Content;
  enContent: Content;
  collageId: string;
  sectionId: string;
}
interface editNewsProps {
  image: string;
  arContent: Content;
  enContent: Content;
  newsId: string;
}
interface Content {
  title: string;
  body: string;
}
export const newNews = async ({
  image,
  arContent,
  enContent,
  collageId,
  sectionId,
}: newNewsProps): Promise<{ message: string }> => {
  try {
    const newCollage = await prisma.news.create({
      data: {
        image,
        arContent: {
          create: arContent,
        },
        enContent: {
          create: enContent,
        },
        Collage: {
          connect: {
            id: collageId,
          },
        },
        ScientificSection: {
          connect: {
            id: sectionId,
          },
        },
      },
    });
    if (!newCollage) {
      return { message: "فشل انشاء خبر جديد" };
    }
    revalidateTag("collages");
    revalidateTag("news");
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    return { message: "فشلت العملية" };
  }
};
export const editNews = async ({
  image,
  arContent,
  enContent,
  newsId,
  arId,
  enId,
}: editNewsProps & { arId: string; enId: string }): Promise<{
  message: string;
}> => {
  try {
    const newCollage = await prisma.news.update({
      where: { id: newsId },
      data: {
        image,
        arContent: {
          update: {
            where: { id: arId },
            data: {
              ...arContent,
            },
          },
        },
        enContent: {
          update: {
            where: { id: enId },
            data: {
              ...enContent,
            },
          },
        },
      },
    });
    if (!newCollage) {
      return { message: "فشل تحديث خبر جديدة" };
    }
    revalidateTag("collages");
    revalidateTag("news");
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    return { message: "فشلت العملية" };
  }
};
export const deleteNews = async ({
  id,
  arId,
  enId,
}: {
  id: string;
  arId: string;
  enId: string;
}): Promise<{ message: string }> => {
  try {
    const news = await prisma.news.delete({
      where: { id },
    });
    const deletedArContent = await prisma.arContent.delete({
      where: { id: arId },
    });
    const deletedEnContent = await prisma.enContent.delete({
      where: { id: enId },
    });

    if (!news || !deletedEnContent || !deletedArContent) {
      return { message: "فشل حذف الخبر " };
    }
    revalidateTag("collages");
    revalidateTag("news");
    revalidatePath("/");
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    return { message: "فشلت العملية" };
  }
};
