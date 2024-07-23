"use server";

import prisma from "@/prisma/db";
import { revalidateTag } from "next/cache";
interface EditSectionProps {
  body: string;
  enbody: string;
  title: string;
  entitle: string;
  sectionId: string;
}
export const editSection = async ({
  sectionId,
  body,
  enbody,
  entitle,
  title,
}: EditSectionProps) => {
  try {
    const newSection = await prisma.scientificSection.update({
      where: {
        id: sectionId,
      },
      data: {
        ArContent: {
          update: {
            title,
            body,
          },
        },
        EnContent: {
          update: {
            title: entitle,
            body: enbody,
          },
        },
      },
    });
    if (!newSection) {
      return { message: "فشل التعديل" };
    }
    revalidateTag("sections");
    // revalidateTag("sections");
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    return { message: "فشلت العملية" };
  }
};

export const deleteSection = async ({ id }: { id: string }) => {
  try {
    const content = await prisma.scientificSection.findUnique({
      where: { id },
      // include: {
      //   ArContent: true,
      //   EnContent: true,
      // },
    });
    let deletedArContent, deletedEnContent;
    if (content && content.arContentId && content.enContentId) {
      deletedArContent = await prisma.arContent.delete({
        where: { id: content.arContentId },
      });
      deletedEnContent = await prisma.enContent.delete({
        where: { id: content.enContentId },
      });
    }
    const deletedNews = await prisma.news.deleteMany({
      where: {
        scientificSectionId: id,
      },
    });
    const deletedTeachers = await prisma.user.deleteMany({
      where: {
        role: "teacher",
        sectionId: id,
      },
    });
    const section = await prisma.scientificSection.delete({
      where: {
        id,
      },
    });
    if (!section || !deletedNews || !deletedTeachers) {
      return { message: "فشل حذف القسم" };
    }
    revalidateTag("sections");
    revalidateTag("collages");
    revalidateTag("news");
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    return { message: "فشلت العملية" };
  }
};
