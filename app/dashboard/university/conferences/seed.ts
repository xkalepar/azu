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

export const getConferences = unstable_cache(
  async () => {
    try {
      const conferences = await prisma.conferences.findMany({
        include: {
          arContent: true,
          enContent: true,
        },
      });
      if (!conferences) {
        return [];
      }
      return conferences;
    } catch (error) {
      return [];
    }
  },
  ["conferences", "university"],
  { tags: ["conferences", "university"] }
);
export const createConferences = async (
  data: Omit<Mangzine, "id" | "createdAt" | "updatedAt">
): Promise<{ message: string }> => {
  try {
    const newConferences = await prisma.conferences.create({
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
    if (!newConferences) return { message: "فشل في الإنشاء" };
    // revalidatePath("/");
    revalidateTag("conferences");
    revalidateTag("university");

    return { message: "تم إنشاء المؤتمر بنجاح" };
  } catch (error) {
    console.error(error);
    return { message: "فشل في إنشاء المؤتمر" };
  }
};
export const getConference = async ({ id }: { id: string }) => {
  try {
    const conference = await prisma.conferences.findUnique({
      where: { id },
      include: {
        arContent: true,
        enContent: true,
      },
    });
    if (!conference) {
      return undefined;
    }
    return conference;
  } catch (error) {
    return undefined;
  }
};
export const deleteConference = async ({
  id,
  arId,
  enId,
}: {
  id: string;
  arId: string;
  enId: string;
}): Promise<{ message: string }> => {
  try {
    const deleted = await prisma.conferences.delete({
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
    revalidateTag("conferences");
    revalidateTag("university");

    return { message: "تم حذف المؤتمر بنجاح" };
  } catch (error) {
    console.error(error);
    return { message: "فشل في حذف المؤتمر" };
  }
};
export const updateConference = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<Mangzine>;
}): Promise<{ message: string }> => {
  try {
    const updatedConference = await prisma.conferences.update({
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
    if (!updatedConference) {
      return { message: "تعذر التحديث" };
    }
    // revalidatePath("/");
    revalidateTag("conferences");
    revalidateTag("university");

    return { message: "تم تحديث المؤتمر بنجاح" };
  } catch (error) {
    console.error(error);
    return { message: "فشل في تحديث المؤتمر" };
  }
};
