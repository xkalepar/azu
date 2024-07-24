import ParseData from "@/app/components/parse-data";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import { Suspense } from "react";
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
import Lang from "@/app/[lang]/components/lang";

export async function generateMetadata({
  params,
}: {
  params: { magazine: string; lang: "ar" | "en" };
}): Promise<Metadata> {
  const { magazine: magazineId, lang } = params;
  const magazine = await getMagazine({ id: magazineId });
  if (!magazine) {
    return {
      title: "404 غير موجود",
    };
  }

  return {
    title:
      lang === "ar"
        ? ` المجلات | ${magazine.arContent?.title}`
        : ` magazines | ${magazine.enContent?.title}`,
    description:
      lang === "ar" ? magazine.arContent?.body : magazine.enContent?.body,
  };
}

export async function generateStaticParams(

) {
  const magazine = await getAllMagazines({});
  return magazine.map((id) => ({ id: id.id }));
}

const magazinePage = async ({
  params,
}: {
  params: { magazine: string; lang: "ar" | "en" };
}) => {
  const { magazine: id } = params;
  const magazine = await getMagazine({ id });
  console.log(magazine)
  if (!magazine) {
    return notFound();
  }
  const { lang } = params;
  return (
    <main className="container xl:mx-4 xl:px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${lang}`}>
                <Lang lang={lang} ar={"الرئيسية"} en={"home"} />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${lang}/magazines`}>
                <Lang lang={lang} ar={"المجلة"} en={"magazine"} />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />
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

      <Suspense
        fallback={
          <>
            <Skeleton className=" min-w-full max-w-full min-h-full"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
            <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
          </>
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

        <Link className={cn(" w-full my-2 sm:w-fit mx-auto flex justify-center items-center gap-2", "bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-md px-4 py-2")} target={"_blank"}
          download={true}
          href={magazine!.pdfUri as string}>
          <DownloadCloudIcon></DownloadCloudIcon>
          <Lang
            lang={lang}
            ar={
              "تحميل"
            }
            en={
              "download"
            }
          />
        </Link>

      </Suspense>
    </main>
  );
};

export default magazinePage;
