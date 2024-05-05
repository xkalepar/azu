"use server";

import {
  ArCollageData,
  ArContent,
  Category,
  Collage,
  EnCollageData,
  EnContent,
  News,
  PrismaClient,
} from "@prisma/client";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
const prisma = new PrismaClient();
interface NewCollageProps {
  arProps: ArCollageData;
  enProps: EnCollageData;
  category: Category;
  logo: string;
  welcome: string;
}
export const newCollage = async ({
  arProps,
  enProps,
  logo,
  category,
  welcome,
}: NewCollageProps): Promise<{ message: string }> => {
  try {
    // console.log(`arProps: ${arProps}`);
    // console.log(`enProps: ${enProps}`);
    // console.log(`list: ${list}`);
    const newCollage = await prisma.collage.create({
      data: {
        logo,
        welcome,
        category,
        ArCollageData: {
          create: {
            title: arProps.title,
            content: arProps.content,
            // desk: arProps.desk,
            // goals: arProps.goals,
            // management: arProps.management,
            // name: arProps.name,
            // origin: arProps.origin,
            // rating: arProps.rating,
            // shoan: arProps.shoan,
            // structure: arProps.structure,
            // List: {
            //   createMany: {
            //     data: list,
            //   },
            // },
          },
        },
        EnCollageData: {
          create: {
            title: enProps.title,
            content: enProps.content,
            // desk: enProps.desk,
            // goals: enProps.goals,
            // management: enProps.management,
            // name: enProps.name,
            // origin: enProps.origin,
            // rating: enProps.rating,
            // shoan: enProps.shoan,
            // structure: enProps.structure,
            // List: {
            //   createMany: {
            //     data: enList,
            //   },
            // },
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

export const getCollageById = async (
  id: string,
  ScientificSection: boolean = false
) => {
  // Function body...
  try {
    const collage = await prisma.collage.findUnique({
      where: { id },
      include: {
        ArCollageData: true,
        EnCollageData: true,
        ScientificSection: ScientificSection,
      },
    });
    if (!collage) return undefined;
    return collage;
  } catch (error) {
    return undefined;
  }
};

export const getNews = unstable_cache(
  async ({
    collageId,
    id,
    includeScientificSection = false,
  }: {
    collageId?: string;
    query?: string;
    id?: string;
    includeCollage?: boolean;
    includeScientificSection?: boolean;
  }) => {
    try {
      const news = await prisma.news.findMany({
        where: {
          id: id,
          collageId: collageId,
        },
        include: {
          arContent: true,
          enContent: true,
          Collage: {
            include: {
              ArCollageData: true,
            },
          },
          ScientificSection: includeScientificSection,
        },
      });
      if (!news) {
        return [];
      }
      return news;
    } catch (error) {
      return [];
    }
  },
  ["news"],
  { tags: ["news", "collages"] }
);
interface newNewsProps {
  image: string;
  arContent: Content;
  enContent: Content;
  collageId: string;
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
      },
    });
    if (!newCollage) {
      return { message: "فشل انشاء خبر جديدة" };
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
  collageId,
  newsId,
}: newNewsProps & { newsId: string }): Promise<{ message: string }> => {
  try {
    const newCollage = await prisma.news.update({
      where: { id: newsId },
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
}: {
  id: string;
}): Promise<{ message: string }> => {
  try {
    const news = await prisma.news.delete({
      where: { id },
    });
    if (!news) {
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
export const imagesGallery = async ({
  list,
  id,
}: {
  list: string[];
  id: string;
}) => {
  try {
    console.log("... starting upload images ");
    const images = await prisma.collage.update({
      where: { id },
      data: {
        gallery: {
          set: list,
        },
      },
    });
    console.log("... finshing upload images ");

    console.log(images);
    revalidatePath("/");
    revalidateTag("collages");
    if (!images) {
      return [];
    }
    console.log(images);
    return images;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const addImageGallery = async ({
  image,
  id,
}: {
  image: string;
  id: string;
}) => {
  try {
    console.log("... starting upload images ");
    const images = await prisma.collage.update({
      where: { id },
      data: {
        gallery: {
          push: image,
        },
      },
    });
    console.log("... finshing upload images ");

    console.log(images);
    revalidatePath("/");
    revalidateTag("collages");
    if (!images) {
      return [];
    }
    console.log(images);
    return images;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const aa = async () => {
  // await prisma.collage.updateMany({ data: { category: "one" } });
  // await prisma.collage.deleteMany();
  // await prisma.enCollageData.deleteMany();
  // await prisma.arCollageData.deleteMany();
  // await prisma.list.deleteMany();
  revalidateTag("collages");
  revalidateTag("news");
};
