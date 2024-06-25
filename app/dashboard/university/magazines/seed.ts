"use server";

import prisma from "@/prisma/db";
import { revalidateTag, unstable_cache } from "next/cache";

type Mangzine = {
  arContent?: ArContent;
  enContent?: EnContent;
  pdfUri?: string;
  logo: string;
};

type ArContent = {
  id: string;
  title: string;
  body: string;
};

type EnContent = {
  id: string;
  title: string;
  body: string;
};

export const getMagazines = unstable_cache(
  async () => {
    try {
      const magazines = await prisma.mangzine.findMany({
        include: {
          arContent: true,
          enContent: true,
        },
      });
      if (!magazines) {
        return [];
      }
      return magazines;
    } catch (error) {
      return [];
    }
  },
  ["magazine", "university"],
  { tags: ["magazine", "university"] }
);
export const createMagazine = async (
  data: Omit<Mangzine, "id" | "createdAt" | "updatedAt">
): Promise<{ message: string }> => {
  try {
    const newMagazine = await prisma.mangzine.create({
      data: {
        arContent: {
          create: {
            title: data?.arContent?.title ?? "",
            body: data?.arContent?.body ?? "",
          },
        },
        enContent: {
          create: {
            title: data?.enContent?.title ?? "",
            body: data?.enContent?.body ?? "",
          },
        },
        pdfUri: data.pdfUri,
        logo: data.logo,
      },
    });
    if (!newMagazine) return { message: "فشل في الإنشاء" };
    // revalidatePath("/");
    revalidateTag("magazine");
    revalidateTag("university");

    return { message: "تم إنشاء المجلة بنجاح" };
  } catch (error) {
    console.error(error);
    return { message: "فشل في إنشاء المجلة" };
  }
};
export const getMagazine = async ({ id }: { id: string }) => {
  try {
    const magazines = await prisma.mangzine.findUnique({
      where: { id },
      include: {
        arContent: true,
        enContent: true,
      },
    });
    if (!magazines) {
      return undefined;
    }
    return magazines;
  } catch (error) {
    return undefined;
  }
};
export const deleteMagazine = async ({
  id,
  arId,
  enId,
}: {
  id: string;
  arId: string;
  enId: string;
}): Promise<{ message: string }> => {
  try {
    const deleted = await prisma.mangzine.delete({
      where: { id },
    });
    const deletedAr = await prisma.arContent.delete({
      where: { id: arId },
    });
    const deletedEn = await prisma.enContent.delete({
      where: { id: enId },
    });

    if (!deleted || !deletedAr || !deletedEn) {
      return { message: "تعذر الحذف" };
    }
    revalidateTag("magazine");
    revalidateTag("university");

    return { message: "تم حذف المجلة بنجاح" };
  } catch (error) {
    console.error(error);
    return { message: "فشل في حذف المجلة" };
  }
};
export const updateMagazine = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<Mangzine>;
}): Promise<{ message: string }> => {
  try {
    const updatedMagazine = await prisma.mangzine.update({
      where: { id },
      data: {
        pdfUri: data.pdfUri,
        logo: data.logo,
        arContent: {
          update: {
            where: { id: data.arContent?.id },
            data: {
              body: data.arContent?.body,
              title: data.arContent?.title,
            },
          },
        },
        enContent: {
          update: {
            where: { id: data.enContent?.id },
            data: {
              body: data.enContent?.body,
              title: data.enContent?.title,
            },
          },
        },
      },
    });
    if (!updatedMagazine) {
      return { message: "تعذر التحديث" };
    }
    // revalidatePath("/");
    revalidateTag("magazine");
    revalidateTag("university");

    return { message: "تم تحديث المجلة بنجاح" };
  } catch (error) {
    console.error(error);
    return { message: "فشل في تحديث المجلة" };
  }
};
