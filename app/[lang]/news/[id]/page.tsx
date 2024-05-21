// import Statiscs from "@/app/[lang]/components/statiscs";
import ParseData from "@/app/components/parse-data";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import { Suspense } from "react";
import Lang from "../../components/lang";
import { getNews, getNewsbyId } from "@/prisma/seed";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
export async function generateMetadata({
  params,
}: {
  params: { id: string; lang: "ar" | "en" };
}): Promise<Metadata> {
  const { id, lang } = params;
  const center = await getNewsbyId(id);
  if (!center) {
    return {
      title: "404 غير موجود",
    };
  }

  return {
    title:
      lang === "ar"
        ? ` الأخبار | ${center.arContent?.title}`
        : ` News | ${center.enContent?.title}`,
    description:
      lang === "ar" ? center.arContent?.body : center.enContent?.body,
  };
}

export async function generateStaticParams() {
  const news = await getNews({});

  return news.map((id) => ({ id: id.id }));
}

const centerPage = async ({
  params,
}: {
  params: { id: string; lang: "ar" | "en" };
}) => {
  const { id } = params;
  const news = await getNewsbyId(id);
  if (!news) {
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
                {" "}
                <Lang lang={lang} ar={"الرئيسية"} en={"home"} />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${lang}/news`}>
                <Lang lang={lang} ar={"الأخبار"} en={"News"} />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Lang
                ar={news.arContent?.title}
                en={news.enContent?.title}
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
          ar={<ParseData dir="rtl" content={news.arContent?.body ?? ""} />}
          en={<ParseData dir="ltr" content={news.enContent?.body ?? ""} />}
        />
      </Suspense>
    </main>
  );
};

export default centerPage;
