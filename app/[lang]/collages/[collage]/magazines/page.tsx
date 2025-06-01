import CardPreview from "@/app/components/card-preview";
import { getAllMagazines, getCollageById, getMagazines } from "@/prisma/seed";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { cutString } from "@/lib/utils";
import ParseData from "@/app/components/parse-data";
import { getDir } from "@/app/[lang]/components/footers/home-footer";
import Lang from "@/app/[lang]/components/lang";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { redirect } from "next/navigation";

const PAGE_SIZE = 20;

export async function generateMetadata({
  params,
}: {
  params: { collage: string; lang: "ar" | "en" };
}) {
  const collage = await getCollageById(params.collage);
  if (!collage) {
    return {
      title: "404 غير موجود",
    };
  }

  return {
    title:
      params.lang === "ar"
        ? `المجلات العلمية | ${collage.ArCollageData?.title} | جامعة الزيتونة ترهونة`
        : `Scientific Magazines | ${collage.EnCollageData?.title} | Al-Zaytouna University Tarhuna`,
    description:
      params.lang === "ar"
        ? collage.ArCollageData?.content
        : collage.EnCollageData?.content,
    icons: collage.logo,
  };
}

type PageProps = {
  params: { lang: Locale; collage: string };
  searchParams?: { page?: string };
};

const page = async ({ params, searchParams }: PageProps) => {
  const { lang, collage } = params;
  const pageParam = Number(searchParams?.page) || 1;

  // Fetch total count for pagination
  const { magazines, total } = await getMagazines({
    page: pageParam,
    qty: PAGE_SIZE,
    linkedId: collage,
    withCount: true,
    // withCount: true, // Make sure your getMagazines supports this
  });

  // If page is out of range, redirect to first page
  console.log("Total magazines: " + total);
  console.log("PAGE_SIZE: " + PAGE_SIZE);
  const totalPages = Math.ceil(total / PAGE_SIZE) || 1;
  if (pageParam > totalPages && totalPages > 0) {
    redirect(`/${lang}/collages/${collage}/magazines?page=1`);
  }

  return (
    <main className=" container ">
      <Breadcrumb dir="rtl">
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
            <BreadcrumbPage>
              <Lang lang={lang} ar={"المجلة"} en={"magazine"} />
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid md:grid-cols-2 my-2 sm:grid-cols-3 gap-2 lg:grid-cols-4">
        {magazines.map((item, index) => {
          return (
            <CardPreview
              key={index}
              lang={lang}
              className=" h-[400px]"
              src={item.logo}
              alt={
                lang === "ar" ? item.arContent?.title : item.enContent?.title
              }
              title={
                lang === "ar" ? item.arContent?.title : item.enContent?.title
              }
              href={`magazines/${item.id}`}
            >
              <div className="my-1 py-1" dir={getDir(lang)}>
                <Lang
                  ar={
                    <ParseData
                      dir="rtl"
                      content={cutString(item.arContent?.body ?? "", 100)}
                    />
                  }
                  en={
                    <ParseData
                      dir="ltr"
                      content={cutString(item.enContent?.body ?? "", 100)}
                    />
                  }
                  lang={lang}
                />
              </div>
            </CardPreview>
          );
        })}
      </div>
      <div className="flex justify-center my-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={pageParam > 1 ? `?page=${pageParam - 1}` : "#"}
                aria-disabled={pageParam === 1}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href={`?page=${i + 1}`}
                  isActive={pageParam === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href={pageParam < totalPages ? `?page=${pageParam + 1}` : "#"}
                aria-disabled={pageParam === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
};

export default page;
