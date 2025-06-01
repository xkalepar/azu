import { buttonVariants } from "@/lib/constant";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Metadata } from "next";
import { Clock } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  return {
    title:
      params.lang === "ar"
        ? "قريباً | جامعة الزيتونة ترهونة"
        : "Coming Soon | Al-Zaytouna University Tarhuna",
    description:
      params.lang === "ar"
        ? "هذه الصفحة قيد الإنشاء وستكون متاحة قريباً."
        : "This page is under construction and will be available soon.",
  };
}

const page = ({ params }: { params: { lang: string } }) => {
  const { lang } = params;
  return (
    <main className="min-h-[75vh] flex flex-col items-center justify-center bg-gradient-to-br from-sage-50 via-white to-forest-50 px-4">
      <Breadcrumb
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="mb-6 container w-full"
      >
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${lang}`}>
                {lang === "ar" ? "الرئيسية" : "Home"}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {lang === "ar" ? "قريباً" : "Coming Soon"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="w-full max-w-lg mx-auto rounded-2xl p-8 flex flex-col items-center">
        <div className="flex flex-col min-h-[50vh] from-sage-50 via-white to-forest-50 min-w-full items-center gap-4">
          <span className="bg-sage-100 p-4 rounded-full shadow mb-2">
            <Clock className="h-10 w-10 text-forest-600" />
          </span>
          <h1 className="font-extrabold text-3xl md:text-4xl text-forest-800 text-center mb-2">
            {lang === "ar" ? "قريباً" : "Coming Soon"}
          </h1>
          <p className="text-gray-600 text-center mb-6">
            {lang === "ar"
              ? "هذه الصفحة قيد الإنشاء وستكون متاحة قريباً. شكراً لصبركم!"
              : "This page is under construction and will be available soon. Thank you for your patience!"}
          </p>
          <Link
            className={cn(
              buttonVariants.default,
              buttonVariants.variants.size.default,
              buttonVariants.variants.variant.default,
              "mt-2"
            )}
            href={`/${lang}`}
          >
            {lang === "ar" ? "العودة للرئيسية" : "Back to Home"}
          </Link>
        </div>
      </div>
    </main>
  );
};

export default page;
