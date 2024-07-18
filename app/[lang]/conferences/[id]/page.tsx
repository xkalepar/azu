// import Statiscs from "@/app/[lang]/components/statiscs";
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
  const { id } = params;
  const conference = await getConference({ id });
  if (!conference) {
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
              <Link href={`/${lang}/conferences`}>
                <Lang lang={lang} ar={"المؤتمرات العلمية"} en={"conferences"} />
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
            <ParseData dir="rtl" content={conference.arContent?.body ?? ""} />
          }
          en={
            <ParseData dir="ltr" content={conference.enContent?.body ?? ""} />
          }
        />
        <Link className={cn(" w-full my-2 sm:w-fit mx-auto flex justify-center items-center gap-2", "bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-md px-4 py-2")} target={"_blank"}
          download={true}
          href={conference!.pdfUri as string}>
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

export default conferencesPage;
