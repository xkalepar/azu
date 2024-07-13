"use server";

import prisma from "@/prisma/db";
import { revalidatePath, revalidateTag } from "next/cache";

export const imagesGallery = async ({
  list,
  id,
}: {
  list: string[];
  id: string;
}) => {
  try {
    console.log("... starting upload images ");
    const images = await prisma.scientificSection.update({
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
    const images = await prisma.scientificSection.update({
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
