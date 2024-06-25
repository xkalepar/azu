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
    const newCollage = await prisma.projects.create({
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
    revalidateTag("projects");
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
    const newCollage = await prisma.projects.update({
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
    revalidateTag("projects");
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
    const news = await prisma.projects.delete({
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
    revalidateTag("projects");
    revalidateTag("university");
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    return { message: "فشلت العملية" };
  }
};
export const getCenters = unstable_cache(
  async () => {
    try {
      const projects = await prisma.projects.findMany({
        include: { arContent: true, enContent: true },
      });
      if (!projects) {
        return [];
      }
      return projects;
    } catch (error) {
      return [];
    }
  },
  ["projects", "university"],
  { tags: ["projects", "university"] }
);

export const getCenter = async ({ id }: { id: string }) => {
  try {
    const center = await prisma.projects.findUnique({
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
