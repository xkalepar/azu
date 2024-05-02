"use server";

import {
  ArCollageData,
  Category,
  Collage,
  EnCollageData,
  PrismaClient,
} from "@prisma/client";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
const prisma = new PrismaClient();

type PropsOfNewCollage = {
  title: string;
  content: string;
};
export const newCollage = async ({
  arProps,
  enProps,
  list,
  enList,
  logo,
  category,
}: {
  arProps: ArCollageData;
  enProps: EnCollageData;
  list: PropsOfNewCollage[];
  enList: PropsOfNewCollage[];
  category: Category;
  logo: string;
}): Promise<{ message: string }> => {
  try {
    console.log(`arProps: ${arProps}`);
    console.log(`enProps: ${enProps}`);
    console.log(`list: ${list}`);
    const newCollage = await prisma.collage.create({
      data: {
        logo,
        category,
        ArCollageData: {
          create: {
            desk: arProps.desk,
            goals: arProps.goals,
            management: arProps.management,
            name: arProps.name,
            origin: arProps.origin,
            rating: arProps.rating,
            shoan: arProps.shoan,
            structure: arProps.structure,
            List: {
              createMany: {
                data: list,
              },
            },
          },
        },
        EnCollageData: {
          create: {
            desk: enProps.desk,
            goals: enProps.goals,
            management: enProps.management,
            name: enProps.name,
            origin: enProps.origin,
            rating: enProps.rating,
            shoan: enProps.shoan,
            structure: enProps.structure,
            List: {
              createMany: {
                data: enList,
              },
            },
          },
        },
      },
    });
    if (!newCollage) {
      return { message: "فشل انشاء كلية جديدة" };
    }
    revalidateTag("collages");
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    return { message: "فشلت العملية" };
  }
};

export const getCollages = unstable_cache(
  async () => {
    try {
      const collages = await prisma.collage.findMany({
        include: {
          ArCollageData: true,
          EnCollageData: true,
        },
      });
      if (!collages) {
        return [];
      }
      return collages;
    } catch (error) {
      return [];
    }
  },
  ["collages"],
  { tags: ["collages"] }
);

export const getCollageById = async (id: string) => {
  try {
    const collage = await prisma.collage.findUnique({
      where: { id },
      include: {
        ArCollageData: {
          include: {
            List: true,
          },
        },
        EnCollageData: {
          include: {
            List: true,
          },
        },
      },
    });
    if (!collage) return undefined;
    return collage;
  } catch (error) {
    return undefined;
  }
};
export const aa = async () => {
  // await prisma.collage.updateMany({ data: { category: "one" } });
  // await prisma.collage.deleteMany();
  // await prisma.enCollageData.deleteMany();
  // await prisma.arCollageData.deleteMany();
  // await prisma.list.deleteMany();
  // revalidateTag("collages");
};
