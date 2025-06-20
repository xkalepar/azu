"use server";

import { ArCollageData, Category, EnCollageData } from "@prisma/client";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import prisma from "./db";
import { env } from "process";
const uniId: string = env.UniveristyId as string;

interface NewCollageProps {
  arProps: ArCollageData;
  enProps: EnCollageData;
  category: Category;
  logo: string;
  welcome: string;
}

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
        include: {
          News: {
            include: {
              arContent: true,
              enContent: true,
            },
          },
          ArContent: true,
          EnContent: true,
          Centers: {
            include: {
              arContent: true,
              enContent: true,
            },
          },
          AcademicProgram: {
            include: {
              arContent: true,
              enContent: true,
            },
          },
          FacilitiesAndServices: {
            include: {
              arContent: true,
              enContent: true,
            },
          },
          GraduatesForUniversity: {
            include: {
              arContent: true,
              enContent: true,
            },
          },
          Projects: {
            include: {
              arContent: true,
              enContent: true,
            },
          },
          ScientificResearchForUniversity: {
            include: {
              arContent: true,
              enContent: true,
            },
          },
          UniversityActivities: {
            include: {
              arContent: true,
              enContent: true,
            },
          },
        },
      });
      if (!university) {
        const newUniversity = await prisma.university.create({
          data: {
            logo: "https://utfs.io/f/5be98e8b-80a7-4898-a05a-5e8d330548a0-7plzqw.jpg",
            id: "66404d695592af5a180663fc",
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
  ["university"],
  { tags: ["university"] }
);

export const editUniversity = async ({
  body,
  title,
  enBody,
  enTitle,
}: {
  body: string;
  title: string;
  enTitle: string;
  enBody: string;
}): Promise<{ message: string }> => {
  try {
    const oldUni = await prisma.university.findUnique({
      where: { id: uniId },
      include: { ArContent: true, EnContent: true },
    });
    let uni;
    if (oldUni?.ArContent?.id === undefined || oldUni?.EnContent?.id) {
      uni = await prisma.university.update({
        where: {
          id: uniId,
        },
        data: {
          ArContent: {
            create: {
              title: title,
              body: body,
            },
          },
          EnContent: {
            create: {
              body: enBody,
              title: enTitle,
            },
          },
        },
      });
    } else {
      uni = await prisma.university.update({
        where: {
          id: uniId,
        },
        data: {
          ArContent: {
            update: {
              where: { id: oldUni?.ArContent?.id },
              data: {
                title: title,
                body: body,
              },
            },
          },
          EnContent: {
            update: {
              where: { id: oldUni?.EnContent?.id },
              data: {
                title: enTitle,
                body: enBody,
              },
            },
          },
        },
      });
    }
    revalidatePath("/");
    revalidateTag("university");
    if (!uni) {
      return { message: "فشل التعديل" };
    }
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    return { message: "فشل التعديل" };
  }
};
export const getNewsbyId = async (id: string) => {
  try {
    const news = await prisma.news.findUnique({
      where: { id },
      include: {
        arContent: true,
        enContent: true,
      },
    });
    if (!news) {
      return undefined;
    }
    return news;
  } catch (error) {
    return undefined;
  }
};
export const getAllnews = async (university: boolean = false) => {
  try {
    const news = await prisma.news.findMany({
      where: {
        universityId: university ? uniId : null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!news) {
      return [];
    }
    return news;
  } catch (error) {
    return [];
  }
};

// export const getUniNews = unstable_cache(
//   async ({
//     page = 1,
//     take = 20,
//     query,
//   }: {
//     page?: number;
//     query?: string;
//     take?: number;
//   }) => {
//     try {
//       const news = await prisma.news.findMany({
//         where: {
//           universityId: uniId,
//           arContent: {
//             title: {
//               contains: query,
//               mode: "insensitive",
//             },
//             body: {
//               contains: query,
//               mode: "insensitive",
//             },
//           },
//           enContent: {
//             title: {
//               contains: query,
//               mode: "insensitive",
//             },
//             body: {
//               contains: query,
//               mode: "insensitive",
//             },
//           },
//         },
//         take: take,
//         skip: page === 1 ? 0 : page * take,
//         include: {
//           arContent: true,
//           enContent: true,
//         },
//         orderBy: {
//           createdAt: "desc",
//         },
//       });

//       if (!news) {
//         console.log("error1");
//         return [];
//       }

//       return news;
//     } catch (error) {
//       console.log("error");
//       console.log(error);
//       return [];
//     }
//   },
//   ["uniNews", "university"],
//   { tags: ["uniNews", "university"] }
// );

export const getUniNews = unstable_cache(
  async ({
    page = 1,
    take = 20,
    query = "",
    withCount = false,
  }: {
    page?: number;
    query?: string;
    take?: number;
    withCount?: boolean;
  }) => {
    try {
      // Build the filter for both arContent and enContent
      const filter: any = {
        universityId: uniId,
        OR: [
          {
            arContent: {
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { body: { contains: query, mode: "insensitive" } },
              ],
            },
          },
          {
            enContent: {
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { body: { contains: query, mode: "insensitive" } },
              ],
            },
          },
        ],
      };
      let total = 0;

      // Fetch paginated news
      const news = await prisma.news.findMany({
        where: filter,
        take,
        skip: (page - 1) * take,
        include: {
          arContent: true,
          enContent: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (!news) {
        return { news: [], total: 0 };
      }

      if (withCount) {
        total = await prisma.news.count({ where: filter });
      }

      return { news, total };
    } catch (error) {
      console.log("error", error);
      return { news: [], total: 0 };
    }
  },
  ["uniNews", "university"],
  { tags: ["uniNews", "university"] }
);

export const getMagazines = async ({
  qty,
  page = 1,
  query = "",
  linkedId,
  withCount = false,
}: {
  query?: string;
  qty: number;
  page?: number;
  linkedId?: string;
  withCount?: boolean;
}) => {
  try {
    // Build the filter for search and linkedId
    const filter: any = {
      // universityId: uniId,
      ...(linkedId && { linkedId }),
      OR: [
        {
          arContent: {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { body: { contains: query, mode: "insensitive" } },
            ],
          },
        },
        {
          enContent: {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { body: { contains: query, mode: "insensitive" } },
            ],
          },
        },
      ],
    };

    let total = 0;
    const magazines = await prisma.mangzine.findMany({
      take: qty,
      skip: (page - 1) * qty,
      include: {
        arContent: true,
        enContent: true,
      },
      orderBy: { createdAt: "desc" },
    });

    if (withCount) {
      total = await prisma.mangzine.count({
        where: filter,
      });
    }

    return { magazines, total };
  } catch (error) {
    return { magazines: [], total: 0 };
  }
};
export const getAllMagazines =
  // unstable_cache(
  async ({}: {}) => {
    try {
      const magazines = await prisma.mangzine.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      if (!magazines) {
        return [];
      }
      return magazines;
    } catch (error) {
      return [];
    }
  };

export const getConferences = async ({
  take,
  page = 1,
  query = "",
  withCount = false,
}: {
  query?: string;
  take: number;
  page?: number;
  withCount?: boolean;
}) => {
  try {
    // Build filter for search
    const filter: any = {
      OR: [
        {
          arContent: {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { body: { contains: query, mode: "insensitive" } },
            ],
          },
        },
        {
          enContent: {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { body: { contains: query, mode: "insensitive" } },
            ],
          },
        },
      ],
    };

    let total = 0;
    const conferences = await prisma.conferences.findMany({
      where: query ? filter : undefined,
      take: take,
      skip: (page - 1) * take,
      include: {
        arContent: true,
        enContent: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!conferences) {
      return { conferences: [], total: 0 };
    }

    if (withCount) {
      total = await prisma.conferences.count({
        where: query ? filter : undefined,
      });
    }

    return { conferences, total };
  } catch (error) {
    return { conferences: [], total: 0 };
  }
};

export const newCollage = async ({
  arProps,
  enProps,
  logo,
  category,
  welcome,
}: NewCollageProps): Promise<{ message: string }> => {
  try {
    const newCollage = await prisma.collage.create({
      data: {
        logo,
        welcome,
        category,
        ArCollageData: {
          create: {
            title: arProps.title,
            content: arProps.content,
          },
        },
        EnCollageData: {
          create: {
            title: enProps.title,
            content: enProps.content,
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

/// unstable function
export const updateCollage = async ({
  arProps,
  enProps,
  logo,
  category,
  welcome,
  collageId,
  arId,
  enId,
}: NewCollageProps & {
  collageId: string;
  arId: string;
  enId: string;
}): Promise<{ message: string }> => {
  try {
    const newCollage = await prisma.collage.update({
      where: { id: collageId },
      data: {
        logo,
        welcome,
        category,
        ArCollageData: {
          update: {
            where: { id: arId },
            data: {
              title: arProps.title,
              content: arProps.content,
            },
          },
        },
        EnCollageData: {
          update: {
            where: {
              id: enId,
            },
            data: { title: enProps.title, content: enProps.content },
          },
        },
      },
    });
    if (!newCollage) {
      return { message: "فشل تعديل كلية" };
    }
    revalidatePath(`/dashboard/collages/${collageId}`);
    revalidateTag("collages");
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    return { message: "فشلت العملية" };
  }
};

export const deleteCollage = async ({
  collageId,
  arId,
  enId,
}: {
  collageId: string;
  arId: string;
  enId: string;
}): Promise<{ message: string }> => {
  try {
    const deletedNews = await prisma.news.deleteMany({ where: { collageId } });
    const magazines = await prisma.mangzine.deleteMany({
      where: { linkedId: collageId },
    });
    // const sections = await prisma.scientificSection.updateMany({
    //   where: { collageId },
    //   data: {},
    // });
    const deletedCollage = await prisma.collage.delete({
      where: { id: collageId },
    });

    const deletedAr = await prisma.arCollageData.delete({
      where: { id: arId },
    });
    const deletedEn = await prisma.enCollageData.delete({
      where: { id: enId },
    });
    if (
      !deletedCollage ||
      !deletedEn ||
      !deletedAr ||
      !deletedNews ||
      !magazines
    ) {
      return { message: "فشل حذف كلية" };
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
        GraduateStudies: {
          select: {
            id: true,
            Pages: true,
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
export const getCollageByIdForSection = async (id: string) => {
  // Function body...
  try {
    const collage = await prisma.collage.findUnique({
      where: { id },
      include: {
        ArCollageData: true,
        EnCollageData: true,
        SocialMedia: true,
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
            logo: true,
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
    qty = 9,
    page = 0,
  }: {
    collageId?: string;
    query?: string;
    id?: string;
    includeCollage?: boolean;
    includeScientificSection?: boolean;
    qty?: number;
    page?: number;
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
              EnCollageData: true,
            },
          },
          ScientificSection: includeScientificSection,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: qty,
        skip: page !== undefined ? page * qty : 0,
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
  async ({ sectionId }: { sectionId: string }) => {
    try {
      const news = await prisma.news.findMany({
        where: {
          scientificSectionId: sectionId,
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
        orderBy: {
          createdAt: "desc",
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
  sectionId?: string | null;
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
  sectionId,
}: newNewsProps): Promise<{ message: string }> => {
  try {
    let newNews;
    if (sectionId) {
      newNews = await prisma.news.create({
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
          ScientificSection: {
            connect: {
              id: sectionId,
            },
          },
        },
      });
    } else {
      newNews = await prisma.news.create({
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
    }

    if (!newNews) {
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

export const newNewsUni = async ({
  image,
  arContent,
  enContent,
}: {
  image: string;
  arContent: Content;
  enContent: Content;
}): Promise<{ message: string }> => {
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
        University: {
          connect: {
            id: uniId,
          },
        },
      },
    });
    console.log(newCollage);
    if (!newCollage) {
      return { message: "فشل انشاء خبر جديد" };
    }
    revalidateTag("university");
    revalidateTag("uniNews");
    revalidatePath("/");
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    return { message: "فشلت العملية" };
  }
};
export const editNewsUni = async ({
  image,
  arContent,
  enContent,
  newsId,
}: {
  newsId: string;
  image: string;
  arContent: Content;
  enContent: Content;
}): Promise<{ message: string }> => {
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
        University: {
          connect: {
            id: uniId,
          },
        },
      },
    });
    if (!newCollage) {
      return { message: "فشل تحديث خبر جديدة" };
    }
    revalidateTag("university");
    revalidateTag("uniNews");
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    return { message: "فشلت العملية" };
  }
};

/// maybe not now but add delete ar content and en content
export const deleteNewsUni = async ({
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
    revalidateTag("university");
    revalidateTag("uniNews");

    revalidatePath("/");
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    return { message: "فشلت العملية" };
  }
};
