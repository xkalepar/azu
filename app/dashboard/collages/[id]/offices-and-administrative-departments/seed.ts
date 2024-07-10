"use server";

import prisma from "@/prisma/db";
import { revalidateTag, unstable_cache } from "next/cache";

export const getData = unstable_cache(
  async ({ id }: { id: string }) => {
    try {
      const offices =
        await prisma.theOfficesAndAdministrativeDepartments.findMany({
          where: {
            Collage: {
              every: {
                id: id,
              },
            },
          },
          include: {
            Pages: true,
          },
        });

      if (!offices) {
        return [];
      }
      return offices;
    } catch (error) {
      return [];
    }
  },
  ["collages", "collageOffices"],
  { tags: ["collages", "collageOffices"] }
);

interface Props {
  title: string;
  body: string;
  enTitle: string;
  enBody: string;
}

export const createData = async ({
  body,
  enBody,
  enTitle,
  title,
  collageId,
}: Props & {
  collageId: string;
}): Promise<{ message: string }> => {
  try {
    const newData = await prisma.theOfficesAndAdministrativeDepartments.create({
      data: {
        Collage: {
          connect: {
            id: collageId,
          },
        },
        Pages: {
          create: {
            title,
            enBody,
            body,
            enTitle,
          },
        },
      },
    });
    console.log(newData);
    if (!newData) {
      return { message: "فشل انشاء مركز جديد" };
    }

    revalidateTag("collages");
    revalidateTag("collageOffices");

    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    return { message: "فشلت العملية" };
  }
};
export const updateData = async ({
  pageId,
  body,
  enBody,
  enTitle,
  title,
}: Props & { pageId: string }): Promise<{
  message: string;
}> => {
  try {
    const updateData = await prisma.page.update({
      where: {
        id: pageId,
      },
      data: {
        body,
        enBody,
        enTitle,
        title,
      },
    });

    if (!updateData) {
      return { message: "فشل تحديث البيانات" };
    }
    revalidateTag("collages");
    revalidateTag("collageOffices");

    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    return { message: "فشلت العملية" };
  }
};
export const deleteData = async ({
  pageId,
}: {
  pageId: string;
}): Promise<{ message: string }> => {
  try {
    const deletedPage = await prisma.page.delete({
      where: { id: pageId },
    });

    if (!deletedPage) {
      return { message: "فشل حذف البيانات " };
    }
    revalidateTag("collages");
    revalidateTag("collageOffices");

    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    return { message: ".فشلت العملية" };
  }
};

export const getSpecificData = async ({ id }: { id: string }) => {
  try {
    const data = await prisma.page.findUnique({
      where: { id },
    });
    if (!data) {
      return undefined;
    }
    return data;
  } catch (error) {
    return undefined;
  }
};
