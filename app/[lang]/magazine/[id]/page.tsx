import ParseData from "@/app/components/parse-data";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import { Suspense } from "react";
import Lang from "../../components/lang";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { getMagazine } from "@/app/dashboard/university/magazines/seed";
import { getAllMagazines } from "@/prisma/seed";
import { DownloadCloudIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import BreadCrumbsSepratorLang from "../../components/bread-crumbs-seprator";

export async function generateMetadata({
  params,
}: {
  params: { id: string; lang: "ar" | "en" };
}): Promise<Metadata> {
  const { id, lang } = params;
  const magazine = await getMagazine({ id });
  if (!magazine) {
    return {
      title: "404 غير موجود",
    };
  }

  return {
    title:
      lang === "ar"
        ? `المجلات | ${magazine.arContent?.title}`
        : `Magazines | ${magazine.enContent?.title}`,
    description:
      lang === "ar" ? magazine.arContent?.body : magazine.enContent?.body,
  };
}

export async function generateStaticParams() {
  const magazine = await getAllMagazines({});
  return magazine.map((id) => ({ id: id.id }));
}

const magazinePage = async ({
  params,
}: {
  params: { id: string; lang: "ar" | "en" };
}) => {
  const { id, lang } = params;
  const magazine = await getMagazine({ id });
  if (!magazine) {
    return notFound();
  }

  // Format the publish date
  const publishDate =
    magazine.createdAt &&
    new Date(magazine.createdAt).toLocaleDateString(
      lang === "ar" ? "ar-EG" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

  return (
    <main className="container max-w-3xl mx-auto py-10 px-4">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${lang}`}>
                <Lang lang={lang} ar="الرئيسية" en="Home" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadCrumbsSepratorLang />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${lang}/magazine`}>
                <Lang lang={lang} ar="المجلات" en="Magazines" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadCrumbsSepratorLang />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Lang
                ar={magazine.arContent?.title}
                en={magazine.enContent?.title}
                lang={lang}
              />
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-forest-800 mb-2 text-center">
          <Lang
            ar={magazine.arContent?.title}
            en={magazine.enContent?.title}
            lang={lang}
          />
        </h1>
        {publishDate && (
          <div className="text-center text-gray-500 text-sm mb-2">
            {lang === "ar"
              ? `تاريخ النشر: ${publishDate}`
              : `Published: ${publishDate}`}
          </div>
        )}
        <div className="flex flex-col gap-4">
          <Suspense
            fallback={
              <div className="space-y-2">
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </div>
            }
          >
            <Lang
              lang={lang}
              ar={
                <ParseData dir="rtl" content={magazine.arContent?.body ?? ""} />
              }
              en={
                <ParseData dir="ltr" content={magazine.enContent?.body ?? ""} />
              }
            />
          </Suspense>
        </div>
        {magazine.pdfUri && (
          <div className="flex justify-center mt-6">
            <Link
              className={cn(
                "flex items-center gap-2 bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-full px-6 py-3 font-semibold transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary/60"
              )}
              target="_blank"
              download
              href={magazine.pdfUri as string}
            >
              <DownloadCloudIcon className="w-5 h-5" />
              <Lang lang={lang} ar="تحميل المجلة PDF" en="Download PDF" />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default magazinePage;
