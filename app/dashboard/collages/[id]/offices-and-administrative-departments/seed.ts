"use server";

import prisma from "@/prisma/db";
import { revalidateTag, unstable_cache } from "next/cache";

export const getData = unstable_cache(
  async ({ id }: { id: string }) => {
    try {
      const offices = await prisma.collage.findMany({
        where: {
          id,
        },
        include: {
          ArCollageData: {
            select: {
              title: true,
            },
          },
          TheOfficesAndAdministrativeDepartments: {
            include: {
              Pages: true,
            },
          },
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
  id,
  pageId,
}: {
  id: string;
  pageId: string;
}): Promise<{ message: string }> => {
  try {
    const deletedData =
      await prisma.theOfficesAndAdministrativeDepartments.delete({
        where: { id },
      });
    const deletedPage = await prisma.page.delete({
      where: { id: pageId },
    });

    if (!deletedData || !deletedPage) {
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
    const center =
      await prisma.theOfficesAndAdministrativeDepartments.findUnique({
        where: { id },
        include: {
          Pages: true,
          Collage: {
            select: {
              ArCollageData: {
                select: {
                  title: true,
                },
              },
            },
          },
        },
      });
    if (!center) {
      return undefined;
    }
    return center;
  } catch (error) {
    return undefined;
  }
};
