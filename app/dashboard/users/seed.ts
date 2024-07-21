"use server";

import prisma from "@/prisma/db";

export const getCollages = async () => {
  try {
    const collages = await prisma.collage.findMany({
      select: {
        id: true,
        ArCollageData: {
          select: {
            title: true,
          },
        },
      },
    });
    if (!collages) {
      return [];
    }
    const response: { id: string; title?: string }[] = collages.map(
      (collage) => ({ id: collage.id, title: collage.ArCollageData?.title })
    );
    return response;
  } catch (error) {
    return [];
  }
};
