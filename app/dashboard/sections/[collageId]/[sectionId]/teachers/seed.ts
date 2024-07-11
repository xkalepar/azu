"use server";

import { revalidateTag } from "next/cache";
import { hashPassword } from "@/lib/auth";
import prisma from "@/prisma/db";
type UserRole = "admin" | "teacher" | "superAdmin" | "student";
interface Props {
  fullName: string;
  password: string;
  role: UserRole;
  phone: number;
  acadamicCondtion?: string | null;
  cv?: string | null;
  image?: string | null;
  content?: string | null;
  sectionId?: string | null;
  collageId?: string | null;
}

export const createUser = async ({
  fullName,
  password,
  role = "teacher",
  phone,
  acadamicCondtion,
  cv,
  image,
  content,
  collageId,
  sectionId,
}: Props): Promise<{ message: string }> => {
  try {
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        fullName,
        password: hashedPassword,
        role,
        phone,
        acadamicCondtion,
        cv,
        image,
        content,
        collageId,
        sectionPageId: sectionId,
      },
    });
    if (!user) {
      return { message: "فشل إنشاء المستخدم" };
    }
    // revalidateTag("collages");
    // revalidateTag("users");
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    console.error("Error creating user:", error);
    return { message: "فشلت العملية" };
  }
};

export const getUsers = async ({ role = "teacher" }: { role: UserRole }) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role,
      },
    });
    if (!users) {
      return [];
    }
    return users;
  } catch (error) {
    return [];
  }
};
