import type { Category, ArCollageData, EnCollageData } from "@prisma/client";

type CollageType = {
  collages: ({
    ArCollageData: {
      id: string;
      title: string;
      content: string;
    } | null;
    EnCollageData: {
      id: string;
      title: string;
      content: string;
    } | null;
  } & {
    id: string;
    logo: string;
    arabicId: string | null;
    englishId: string | null;
    category: Category;
  })[];
};
