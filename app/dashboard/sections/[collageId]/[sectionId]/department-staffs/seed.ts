"use server";

import { PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();

interface newProps {
  body: string;
  enbody: string;
  title: string;
  entitle: string;
  sectionId: string;
}

export const addSectionDepartmentCoordinatorsData = async ({
  body,
  enbody,
  entitle,
  sectionId,
  title,
}: newProps): Promise<{
  message: string;
}> => {
  try {
    const newData = await prisma.sectionPage.create({
      data: {
        DepartmentStaff: {
          connect: {
            id: sectionId,
          },
        },
        ArContent: {
          create: {
            title: title,
            body: body,
          },
        },
        EnContent: {
          create: {
            title: entitle,
            body: enbody,
          },
        },
      },
    });
    if (!newData) {
      return { message: "فشل حفظ البيانات" };
    }
    revalidateTag("collages");
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    console.log(error);
    return { message: "فشلت العملية" };
  }
};
interface EditProps {
  body: string;
  enbody: string;
  title: string;
  entitle: string;
  dataId: string;
  arId: string;
  enId: string;
}
export const updateSectionDepartmentCoordinatorsData = async ({
  body,
  enbody,
  entitle,
  dataId: id,
  title,
  arId,
  enId,
}: EditProps): Promise<{
  message: string;
}> => {
  try {
    const updatedData = await prisma.sectionPage.update({
      where: { id },
      data: {
        ArContent: {
          update: {
            where: { id: arId },
            data: {
              title: title,
              body: body,
            },
          },
        },
        EnContent: {
          update: {
            where: { id: enId },
            data: {
              title: entitle,
              body: enbody,
            },
          },
        },
      },
    });
    if (!updatedData) {
      return { message: "فشل حفظ البيانات" };
    }
    revalidateTag("collages");
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    console.log(error);
    return { message: "فشلت العملية" };
  }
};

export const getDataById = async (id: string) => {
  try {
    const data = await prisma.sectionPage.findUnique({
      where: { id },
      include: {
        ArContent: true,
        EnContent: true,
      },
    });
    if (!data) {
      return undefined;
    }
    return data;
  } catch (error) {
    return undefined;
  }
};

export const deleteSectionDepartmentCoordinatorsData = async ({
  id,
  arId,
  enId,
}: {
  id: string;
  arId: string;
  enId: string;
}): Promise<{
  message: string;
}> => {
  try {
    const newData = await prisma.sectionPage.delete({
      where: { id },
    });
    const deletedArContent = await prisma.arContent.delete({
      where: { id: arId },
    });
    const deletedEnContent = await prisma.enContent.delete({
      where: { id: enId },
    });

    if (!newData || !deletedArContent || !deletedEnContent) {
      return { message: "فشل حذف البيانات" };
    }
    revalidateTag("collages");
    // redirect("/dashboard");
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    console.log(error);
    return { message: "فشلت العملية" };
  }
};
