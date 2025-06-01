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
import {
  getConference,
  getConferences,
} from "@/app/dashboard/university/conferences/seed";
import { DownloadCloudIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: { id: string; lang: "ar" | "en" };
}): Promise<Metadata> {
  const { id, lang } = params;
  const conference = await getConference({ id });
  if (!conference) {
    return {
      title: "404 غير موجود",
    };
  }

  return {
    title:
      lang === "ar"
        ? ` المؤتمرات العلمية | ${conference.arContent?.title}`
        : ` Conferences | ${conference.enContent?.title}`,
    description:
      lang === "ar" ? conference.arContent?.body : conference.enContent?.body,
  };
}

export async function generateStaticParams() {
  const conferences = await getConferences();
  return conferences.map((id) => ({ id: id.id }));
}

const conferencesPage = async ({
  params,
}: {
  params: { id: string; lang: "ar" | "en" };
}) => {
  const { id, lang } = params;
  const conference = await getConference({ id });
  if (!conference) {
    return notFound();
  }

  // Format the publish date
  const publishDate =
    conference.createdAt &&
    new Date(conference.createdAt).toLocaleDateString(
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
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${lang}/conferences`}>
                <Lang lang={lang} ar="المؤتمرات العلمية" en="Conferences" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Lang
                ar={conference.arContent?.title}
                en={conference.enContent?.title}
                lang={lang}
              />
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-forest-800 mb-2 text-center">
          <Lang
            ar={conference.arContent?.title}
            en={conference.enContent?.title}
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
                <ParseData
                  dir="rtl"
                  content={conference.arContent?.body ?? ""}
                />
              }
              en={
                <ParseData
                  dir="ltr"
                  content={conference.enContent?.body ?? ""}
                />
              }
            />
          </Suspense>
        </div>
        {conference.pdfUri && (
          <div className="flex justify-center mt-6">
            <Link
              className={cn(
                "flex items-center gap-2 bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-full px-6 py-3 font-semibold transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary/60"
              )}
              target="_blank"
              download
              href={conference.pdfUri as string}
            >
              <DownloadCloudIcon className="w-5 h-5" />
              <Lang lang={lang} ar="تحميل المؤتمر PDF" en="Download PDF" />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default conferencesPage;
