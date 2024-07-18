"use server";
import { PrismaClient, Role } from "@prisma/client";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();
const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

const checkPassword = async (password: string, hashedPassword: string) => {
  const validPassword = await bcryptjs.compare(password, hashedPassword);
  return validPassword;
};

export const hashPassword = async (password: string) => {
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hash(password, salt);
  return hash;
};

const setCookie = (session: string, expires: Date) => {
  const isProduction = process.env.NODE_ENV === "production";
  cookies().set("session", session, {
    expires,
    httpOnly: true,
    secure: isProduction,
  });
};
//encryt our token
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30 days from now")
    .sign(key);
}

// decrypt our token
export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

/* export async function signUp(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      email: z
        .string()
        .min(4, {
          message: "يجب ان يحتوي الأيميل على اربع حروف على الأقل لأ",
        })
        .email({
          message: "ادخل ايميل صالح",
        }),

      password: z.string().min(6, {
        message: "يجب ان تحوي كلمة السر على ست علامات على الأقل",
      }),
      fullName: z.string().optional(),
    });
    const data = schema.parse({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      fullName: formData.get("fullName") as string,
    });

    if (!data) {
      return { message: "يجب ملء جميع الحقول" };
    }
    const checkEmail = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (checkEmail) {
      return { message: "هذا البريد مستعمل بالفعل يرجي إدخال بريد اخر" };
    }
    const hashedPassword = await hashPassword(data.password);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        hashedPassword,
        fullName: data.fullName,
        role: "user",
      },
    });
    if (!user) {
      return { message: "حدث خطأ أثناء التسجيل" };
    }

    // Create the session
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ user, expires });
    // Save the session in a cookie
    setCookie(session, expires);
    revalidateTag("users");
    return { message: "تم إنشاء الحساب بنجاح" };

    // return cookies().set("session", session, { expires, httpOnly: true });
  } catch (error) {
    console.log(error);
    return { message: "فشل إنشاء الحساب" };
  }
  // console.log(msg);
} */

/* export async function signAdmin(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      email: z
        .string()
        .min(4, {
          message: "يجب ان يحتوي الأيميل على اربع حروف على الأقل لأ",
        })
        .email({
          message: "ادخل ايميل صالح",
        }),

      password: z.string().min(6, {
        message: "يجب ان تحوي كلمة السر على ست علامات على الأقل",
      }),
      fullName: z.string().optional(),
    });
    const data = schema.parse({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      fullName: formData.get("fullName") as string,
    });

    if (!data) {
      return { message: "يجب ملء جميع الحقول" };
    }
    const checkEmail = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (checkEmail) {
      return { message: "هذا البريد مستعمل بالفعل يرجي إدخال بريد اخر" };
    }
    const hashedPassword = await hashPassword(data.password);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        hashedPassword,
        fullName: data.fullName,
        role: "admin",
      },
    });
    if (!user) {
      return { message: "حدث خطأ أثناء التسجيل" };
    }
    revalidatePath("/");
    return { message: "تم إنشاء الحساب بنجاح" };

    // return cookies().set("session", session, { expires, httpOnly: true });
  } catch (error) {
    console.log(error);
    return { message: "فشل إنشاء الحساب" };
  }
  // console.log(msg);
} */

export async function signIn(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      phone: z.string().min(9, {
        message: "يجب إضافة رقمك الشخصي",
      }),
      password: z.string().min(6, {
        message: "يجب ان تحوي كلمة السر على ست علامات على الأقل",
      }),
    });
    const data = schema.parse({
      phone: formData.get("phone") as string,
      password: formData.get("password") as string,
    });

    if (!data) {
      return { message: "يجب ملء جميع الحقول" };
    }

    const user = await prisma.user.findUnique({
      where: { phone: Number(data.phone) },
    });

    if (!user) {
      return {
        message: "لم يتم إيجاد المستخدم",
      };
    }

    const passwordMatch = await checkPassword(data.password, user.password);

    if (!passwordMatch) {
      return { message: "كلمة المرور غير صحيحة" };
    }

    // Create the session
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const session = await encrypt({
      ...{
        fullName: user.fullName,
        id: user.id,
        // password: user.password,
        phone: user.phone,
        role: user.role,
      },
      expires,
    });
    // Save the session in a cookie
    setCookie(session, expires);
    return { message: "تم تسجيل الدخول بنجاح" };
    // return cookies().set("session", session, { expires, httpOnly: true });
  } catch (error) {
    console.log(error);
    return { message: "فشل تسجيل الدخول" };
  }
}

export async function logout() {
  // Destroy the session
  try {
    cookies().set("session", "", { expires: new Date(0) });
    // revalidatePath("/");
    return { message: "تم تسجيل الخروج بنجاح" };
  } catch (error) {
    return { message: "حدث خطأ أثناء تسجيل الخروج" };
  }
}

export async function getSession(): Promise<{
  fullName: string;
  id: string;
  phone: number;
  role: Role;
} | null> {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
