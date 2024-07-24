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
        sectionId,
      },
    });
    if (!user) {
      return { message: "فشل إنشاء المستخدم" };
    }
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    console.error("Error creating user:", error);
    return { message: "فشلت العملية" };
  }
};

export const getUsers = async ({
  role = "teacher",
  query,
  sectionId,
}: {
  role: UserRole;
  query?: string;
  sectionId?: string;
}) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role,
        fullName: { contains: query },
        sectionId,
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

export const getUserById = async ({ userId: id }: { userId: string }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return undefined;
    }
    return user;
  } catch (error) {
    return undefined;
  }
};

export const deleteUser = async ({
  id,
}: {
  id: string;
}): Promise<{ message: string }> => {
  try {
    const user = await prisma.user.delete({
      where: { id },
    });
    if (!user) {
      return { message: "فشل حذف المستخدم" };
    }
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    console.error("Error creating user:", error);
    return { message: "فشلت العملية" };
  }
};

export const updateUser = async ({
  fullName,
  password,
  role = "teacher",
  phone,
  acadamicCondtion,
  cv,
  image,
  content,
  // collageId,
  // sectionId,
  userId,
}: Props & { userId: string }): Promise<{ message: string }> => {
  try {
    const hashedPassword = await hashPassword(password);
    // console.log(content);

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        fullName,
        password: hashedPassword,
        role,
        phone,
        acadamicCondtion,
        cv,
        image,
        content,
        // collageId,
        // sectionId,
      },
    });
    if (!user) {
      return { message: "فشل إنشاء المستخدم" };
    }
    return { message: "تمت العملية بنجاح" };
  } catch (error) {
    console.error("Error creating user:", error);
    return { message: "فشلت العملية" };
  }
};
