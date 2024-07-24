"use server";
import prisma from "@/prisma/db";
import { revalidatePath, revalidateTag } from "next/cache";

export const facebook = async ({
  collageId,
  value,
}: {
  value: string;
  collageId: string;
}) => {
  try {
    const collage = await prisma.collage.findUnique({
      where: { id: collageId },
      include: { SocialMedia: true },
    });
    if (!collage) {
      return { message: "فشلت العملية" };
    }
    if (!collage.SocialMedia) {
      const createSocial = await prisma.socialMedia.create({
        data: {
          facebook: value,
          Collage: {
            connect: {
              id: collageId,
            },
          },
        },
      });
      if (!createSocial) {
        return { message: "فشلت العملية" };
      }
      revalidateTag("collages");
      revalidatePath("/");
      return { message: "تمت العملية بنجاح" };
    }

    const updateSocial = await prisma.socialMedia.update({
      where: {
        id: collage.SocialMedia?.id ?? "",
      },
      data: {
        facebook: value,
      },
    });

    if (!updateSocial) {
      return { message: "فشلت العملية" };
    }
    revalidateTag("collages");
    revalidatePath("/");
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    console.log(error);
    return { message: "فشلت العملية" };
  }
};

export const X = async ({
  collageId,
  value,
}: {
  value: string;
  collageId: string;
}) => {
  try {
    const collage = await prisma.collage.findUnique({
      where: { id: collageId },
      include: { SocialMedia: true },
    });
    if (!collage) {
      return { message: "فشلت العملية" };
    }
    if (!collage.SocialMedia) {
      const createSocial = await prisma.socialMedia.create({
        data: {
          x: value,
          Collage: {
            connect: {
              id: collageId,
            },
          },
        },
      });
      if (!createSocial) {
        return { message: "فشلت العملية" };
      }
      revalidateTag("collages");
      revalidatePath("/");
      return { message: "تمت العملية بنجاح" };
    }

    const updateSocial = await prisma.socialMedia.update({
      where: {
        id: collage.SocialMedia?.id ?? "",
      },
      data: {
        x: value,
      },
    });

    if (!updateSocial) {
      return { message: "فشلت العملية" };
    }
    revalidateTag("collages");
    revalidatePath("/");
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    console.log(error);
    return { message: "فشلت العملية" };
  }
};

export const email = async ({
  collageId,
  value,
}: {
  value: string;
  collageId: string;
}) => {
  try {
    const collage = await prisma.collage.findUnique({
      where: { id: collageId },
      include: { SocialMedia: true },
    });
    if (!collage) {
      return { message: "فشلت العملية" };
    }
    if (!collage.SocialMedia) {
      const createSocial = await prisma.socialMedia.create({
        data: {
          email: value,
          Collage: {
            connect: {
              id: collageId,
            },
          },
        },
      });
      if (!createSocial) {
        return { message: "فشلت العملية" };
      }
      revalidateTag("collages");
      revalidatePath("/");
      return { message: "تمت العملية بنجاح" };
    }

    const updateSocial = await prisma.socialMedia.update({
      where: {
        id: collage.SocialMedia?.id ?? "",
      },
      data: {
        email: value,
      },
    });

    if (!updateSocial) {
      return { message: "فشلت العملية" };
    }
    revalidateTag("collages");
    revalidatePath("/");
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    console.log(error);
    return { message: "فشلت العملية" };
  }
};

export const phoneNumber1 = async ({
  collageId,
  value,
}: {
  value: string;
  collageId: string;
}) => {
  try {
    const collage = await prisma.collage.findUnique({
      where: { id: collageId },
      include: { SocialMedia: true },
    });
    if (!collage) {
      return { message: "فشلت العملية" };
    }
    if (!collage.SocialMedia) {
      const createSocial = await prisma.socialMedia.create({
        data: {
          phone1: value,
          Collage: {
            connect: {
              id: collageId,
            },
          },
        },
      });
      if (!createSocial) {
        return { message: "فشلت العملية" };
      }
      revalidateTag("collages");
      revalidatePath("/");
      return { message: "تمت العملية بنجاح" };
    }

    const updateSocial = await prisma.socialMedia.update({
      where: {
        id: collage.SocialMedia?.id ?? "",
      },
      data: {
        phone1: value,
      },
    });

    if (!updateSocial) {
      return { message: "فشلت العملية" };
    }
    revalidateTag("collages");
    revalidatePath("/");
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    console.log(error);
    return { message: "فشلت العملية" };
  }
};
export const phoneNumber2 = async ({
  collageId,
  value,
}: {
  value: string;
  collageId: string;
}) => {
  try {
    const collage = await prisma.collage.findUnique({
      where: { id: collageId },
      include: { SocialMedia: true },
    });
    if (!collage) {
      return { message: "فشلت العملية" };
    }
    if (!collage.SocialMedia) {
      const createSocial = await prisma.socialMedia.create({
        data: {
          phone2: value,
          Collage: {
            connect: {
              id: collageId,
            },
          },
        },
      });
      if (!createSocial) {
        return { message: "فشلت العملية" };
      }
      revalidateTag("collages");
      revalidatePath("/");
      return { message: "تمت العملية بنجاح" };
    }

    const updateSocial = await prisma.socialMedia.update({
      where: {
        id: collage.SocialMedia?.id ?? "",
      },
      data: {
        phone2: value,
      },
    });

    if (!updateSocial) {
      return { message: "فشلت العملية" };
    }
    revalidateTag("collages");
    revalidatePath("/");
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    console.log(error);
    return { message: "فشلت العملية" };
  }
};
export const location = async ({
  collageId,
  value,
}: {
  value: string;
  collageId: string;
}) => {
  try {
    const locationLink = extractIframeLink(value);
    const collage = await prisma.collage.findUnique({
      where: { id: collageId },
      include: { SocialMedia: true },
    });
    if (!collage) {
      return { message: "فشلت العملية" };
    }
    if (!collage.SocialMedia) {
      const createSocial = await prisma.socialMedia.create({
        data: {
          location: locationLink,
          Collage: {
            connect: {
              id: collageId,
            },
          },
        },
      });
      if (!createSocial) {
        return { message: "فشلت العملية" };
      }
      revalidateTag("collages");
      revalidatePath("/");
      return { message: "تمت العملية بنجاح" };
    }

    const updateSocial = await prisma.socialMedia.update({
      where: {
        id: collage.SocialMedia?.id ?? "",
      },
      data: {
        location: locationLink,
      },
    });

    if (!updateSocial) {
      return { message: "فشلت العملية" };
    }
    revalidateTag("collages");
    revalidatePath("/");
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    console.log(error);
    return { message: "فشلت العملية" };
  }
};

function extractIframeLink(html: string): string {
  const regex = /src="([^"]+)"/;
  const match = html.match(regex);
  return match ? match[1] : "";
}

export const whatsapp = async ({
  collageId,
  value,
}: {
  value: string;
  collageId: string;
}) => {
  try {
    const collage = await prisma.collage.findUnique({
      where: { id: collageId },
      include: { SocialMedia: true },
    });
    if (!collage) {
      return { message: "فشلت العملية" };
    }
    if (!collage.SocialMedia) {
      const createSocial = await prisma.socialMedia.create({
        data: {
          whatsapp: value,
          Collage: {
            connect: {
              id: collageId,
            },
          },
        },
      });
      if (!createSocial) {
        return { message: "فشلت العملية" };
      }
      revalidateTag("collages");
      revalidatePath("/");
      return { message: "تمت العملية بنجاح" };
    }

    const updateSocial = await prisma.socialMedia.update({
      where: {
        id: collage.SocialMedia?.id ?? "",
      },
      data: {
        whatsapp: value,
      },
    });

    if (!updateSocial) {
      return { message: "فشلت العملية" };
    }
    revalidateTag("collages");
    revalidatePath("/");
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    console.log(error);
    return { message: "فشلت العملية" };
  }
};
