"use server";

import prisma from "@/prisma/db";
import { revalidateTag, unstable_cache } from "next/cache";
import { env } from "process";

interface Content {
  title: string;
  body: string;
}

const uniId: string = env.UniveristyId as string;

export const createCenter = async ({
  arContent,
  enContent,
}: {
  arContent: Content;
  enContent: Content;
}): Promise<{ message: string }> => {
  try {
    const newCollage = await prisma.facilitiesAndServices.create({
      data: {
        arContent: {
          create: arContent,
        },
        enContent: {
          create: enContent,
        },
        University: {
          connect: {
            id: uniId,
          },
        },
      },
    });
    console.log(newCollage);
    if (!newCollage) {
      return { message: "فشل انشاء مركز جديد" };
    }
    revalidateTag("facilitiesAndServices");
    revalidateTag("university");

    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    return { message: "فشلت العملية" };
  }
};
export const editCenter = async ({
  arContent,
  enContent,
  centerId,
  arId,
  enId,
}: {
  centerId: string;
  arContent: Content;
  arId: string;
  enId: string;
  enContent: Content;
}): Promise<{ message: string }> => {
  try {
    const newCollage = await prisma.facilitiesAndServices.update({
      where: { id: centerId },
      data: {
        arContent: {
          update: {
            where: { id: arId },
            data: {
              title: arContent.title,
              body: arContent.body,
            },
          },
        },
        enContent: {
          update: {
            where: { id: enId },
            data: {
              title: enContent.title,
              body: enContent.body,
            },
          },
        },
        University: {
          connect: {
            id: uniId,
          },
        },
      },
    });
    if (!newCollage) {
      return { message: "فشل تحديث مركز جديدة" };
    }
    revalidateTag("facilitiesAndServices");
    revalidateTag("university");

    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    return { message: "فشلت العملية" };
  }
};
export const deleteCenter = async ({
  id,
  arId,
  enId,
}: {
  id: string;
  arId: string;
  enId: string;
}): Promise<{ message: string }> => {
  try {
    const news = await prisma.facilitiesAndServices.delete({
      where: { id },
    });
    const deletedArContent = await prisma.arContent.delete({
      where: { id: arId },
    });
    const deletedEnContent = await prisma.enContent.delete({
      where: { id: enId },
    });
    if (!news || !deletedArContent || !deletedEnContent) {
      return { message: "فشل حذف الخبر " };
    }
    revalidateTag("facilitiesAndServices");
    revalidateTag("university");

    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    return { message: "فشلت العملية" };
  }
};
export const getCenters = unstable_cache(
  async () => {
    try {
      const facilitiesAndServices = await prisma.facilitiesAndServices.findMany(
        {
          include: { arContent: true, enContent: true },
        }
      );
      if (!facilitiesAndServices) {
        return [];
      }
      return facilitiesAndServices;
    } catch (error) {
      return [];
    }
  },
  ["facilitiesAndServices", "university"],
  { tags: ["facilitiesAndServices", "university"] }
);

export const getCenter = async ({ id }: { id: string }) => {
  try {
    const center = await prisma.facilitiesAndServices.findUnique({
      where: { id },
      include: { arContent: true, enContent: true },
    });
    if (!center) {
      return undefined;
    }
    return center;
  } catch (error) {
    return undefined;
  }
};
