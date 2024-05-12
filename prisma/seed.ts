"use server";

import {
  ArCollageData,
  Category,
  EnCollageData,
  PrismaClient,
} from "@prisma/client";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { env } from "process";
const prisma = new PrismaClient();
interface NewCollageProps {
  arProps: ArCollageData;
  enProps: EnCollageData;
  category: Category;
  logo: string;
  welcome: string;
}
const uniId: string = env.UniveristyId as string;

export const imagesGalleryUni = async ({ list }: { list: string[] }) => {
  try {
    console.log("... starting upload images ");
    const images = await prisma.university.update({
      where: { id: uniId },
      data: {
        gallery: {
          set: list,
        },
      },
    });
    console.log("... finshing upload images ");

    console.log(images);
    revalidatePath("/");
    revalidateTag("university");
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
export const addImageGalleryUniversity = async ({
  image,
}: {
  image: string;
}) => {
  try {
    console.log("... starting upload images ");
    const images = await prisma.university.update({
      where: { id: uniId },
      data: {
        gallery: {
          push: image,
        },
      },
    });
    console.log("... finshing upload images ");

    console.log(images);
    revalidatePath("/");
    revalidateTag("university");
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
export const getUniversity = unstable_cache(
  async () => {
    try {
      const university = await prisma.university.findFirst({
        include: { News: true },
      });
      if (!university) {
        const newUniversity = await prisma.university.create({
          data: {
            logo: "https://utfs.io/f/5be98e8b-80a7-4898-a05a-5e8d330548a0-7plzqw.jpg",
          },
        });
        if (!newUniversity) {
          return undefined;
        }
      }

      return university;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  },
  ["university", "news"],
  { tags: ["university", "news"] }
);

export const getUniNews = unstable_cache(
  async ({
    take = 3,
    query,
    ar = true,
  }: {
    ar: boolean;
    take: number;
    query?: string;
  }) => {
    try {
      let news = [];
      if (ar) {
        news = await prisma.news.findMany({
          where: {
            universityId: uniId,
            AND: {
              arContent: {
                body: {
                  contains: query,
                },
              },
            },
          },

          take: take,
          include: {
            arContent: true,
            enContent: true,
          },
          orderBy: { createdAt: "asc" },
        });
      } else {
        news = await prisma.news.findMany({
          where: {
            universityId: uniId,
            AND: {
              enContent: {
                body: {
                  contains: query,
                },
              },
            },
          },
          take: take,
          include: {
            arContent: true,
            enContent: true,
          },
        });
      }
      if (!news) {
        return [];
      }
      return news;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);

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
  async (ScientificSection: boolean = false) => {
    try {
      const collages = await prisma.collage.findMany({
        include: {
          ArCollageData: true,
          EnCollageData: true,
          ScientificSection: ScientificSection
            ? {
                include: {
                  ArContent: true,
                  EnContent: true,
                },
              }
            : false,
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

export const getCollageById = async (id: string, sections: boolean = false) => {
  // Function body...
  try {
    const collage = await prisma.collage.findUnique({
      where: { id },
      include: {
        ArCollageData: true,
        EnCollageData: true,
        ScientificSection: sections,
      },
    });
    if (!collage) return undefined;
    return collage;
  } catch (error) {
    return undefined;
  }
};
export const getCollageByIdForSection = async (id: string) => {
  // Function body...
  try {
    const collage = await prisma.collage.findUnique({
      where: { id },
      include: {
        ArCollageData: true,
        ScientificSection: {
          include: {
            ArContent: true,
            EnContent: true,
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

export const getSectionById = async (id: string) => {
  // console.log("..........#############..........");
  try {
    const section = await prisma.scientificSection.findUnique({
      where: { id },
      include: {
        ArContent: true,
        EnContent: true,
        Collage: {
          select: {
            id: true,
            ArCollageData: {
              select: {
                title: true,
              },
            },
          },
        },
        AcademicAffairs: {
          include: {
            ArContent: true,
            EnContent: true,
          },
        },
        departmentCoordinators: {
          include: {
            ArContent: true,
            EnContent: true,
          },
        },
        AcademicGuidanceHandbook: {
          include: {
            ArContent: true,
            EnContent: true,
          },
        },
        DepartmentFormsAndGuidelines: {
          include: {
            ArContent: true,
            EnContent: true,
          },
        },
        DepartmentLaboratories: {
          include: {
            ArContent: true,
            EnContent: true,
          },
        },
        DepartmentStaffs: {
          include: {
            ArContent: true,
            EnContent: true,
          },
        },

        // Collage: {
        //   select: {
        //     title
        //   }
        // }
      },
    });
    if (!section) {
      return undefined;
    }
    return section;
  } catch (error) {
    return undefined;
  }
};

/* export const getSections = async (id: string) => {
  // console.log("..........#############..........");
  try {
    const section = await prisma.scientificSection.findUnique({
      where: {
        id,
      },
      include: {
        ArContent: true,
        EnContent: true,
        Collage: {
          select: {
            ArCollageData: {
              select: {
                title: true,
              },
            },
          },
        },
        departmentCoordinators: {
          include: {
            ArContent: true,
            EnContent: true,
          },
        },
      },
    });
    if (!section) {
      return undefined;
    }
    return section;
  } catch (error) {
    return undefined;
  }
};
 */
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
export const getNewsForSection = unstable_cache(
  async ({
    collageId,
    id,
    query,
    sectinoId,
  }: {
    collageId?: string;
    query?: string;
    id?: string;
    sectinoId: string;
  }) => {
    try {
      const news = await prisma.news.findMany({
        where: {
          id: id,
          collageId: collageId,
          scientificSectionId: sectinoId,
          arContent: {
            body: {
              contains: query,
            },
          },
        },

        include: {
          arContent: true,
          enContent: true,
          Collage: {
            include: {
              ArCollageData: true,
            },
          },
          ScientificSection: {
            include: {
              ArContent: true,
            },
          },
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
      return { message: "فشل انشاء خبر جديد" };
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

interface NewSectionProps {
  body: string;
  enbody: string;
  title: string;
  entitle: string;
  collageId: string;
}
/// new section
export const newSection = async ({
  collageId,
  body,
  enbody,
  entitle,
  title,
}: NewSectionProps) => {
  try {
    const newSection = await prisma.scientificSection.create({
      data: {
        ArContent: {
          create: {
            title,
            body,
          },
        },
        EnContent: {
          create: {
            title: entitle,
            body: enbody,
          },
        },
        Collage: {
          connect: {
            id: collageId,
          },
        },
      },
    });
    if (!newSection) {
      return { message: "فشل انشاء خبر جديدة" };
    }
    revalidateTag("collages");
    // revalidateTag("sections");
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    return { message: "فشلت العملية" };
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
