import LoginForm from "@/app/components/login-form";
import { Metadata } from "next";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import Lang from "@/app/[lang]/components/lang";
import { getDir } from "@/app/[lang]/components/footers/home-footer";

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  return {
    title:
      params.lang === "ar"
        ? "تسجيل الدخول | جامعة الزيتونة ترهونة"
        : "Login | Al-Zaytouna University Tarhuna",
    description:
      params.lang === "ar"
        ? "صفحة تسجيل الدخول إلى بوابة جامعة الزيتونة ترهونة."
        : "Login page for Al-Zaytouna University Tarhuna portal.",
  };
}

const page = ({ params }: { params: { lang: Locale } }) => {
  const lang = params.lang;
  return (
    <main className="min-h-[70vh] w-full bg-muted">
      <Breadcrumb className="container" dir={getDir(lang)}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${lang}`}>
                <Lang lang={lang} ar="الرئيسية" en="Home" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Lang lang={lang} ar="تسجيل الدخول" en="Login" />
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-center min-w-full h-[70vh]  min-h-full items-center">
        <div className="lg:w-1/3 w-[95%] content-center max-w-lg shadow-xl py-10 px-6 md:px-16 rounded-lg flex flex-col bg-background border">
          <h1 className="font-bold text-2xl my-8 text-center">
            <Lang lang={lang} ar="تسجيل الدخول" en="Login" />
          </h1>
          <LoginForm className="w-full" />
        </div>
      </div>
    </main>
  );
};

export default page;
