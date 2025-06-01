import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getUniNews } from "@/prisma/seed";
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
import Lang from "../components/lang";
import { Metadata } from "next";
import ReusableCard from "@/components/reusable-card";
import SearchInput from "@/components/search";
export const metadata: Metadata = {
  title: "أخبار الجامعة",
};

const PAGE_SIZE = 20;

const page = async ({
  params,
  searchParams,
}: {
  params: { lang: Locale };
  searchParams: { query?: string; page?: string };
}) => {
  const { lang } = params;
  const { page, query } = searchParams;
  const pageParam = page ? parseInt(page) : 1;
  const { news, total } = await getUniNews({
    page: page ? parseInt(page) : 1,
    query: query ?? "",
    take: 20,
    withCount: true,
  });

  const totalPages = Math.ceil(total / PAGE_SIZE) || 1;
  console.log(`totalPages: ${totalPages}`);
  console.log(`total: ${total}`);
  return (
    <main>
      <Breadcrumb className="container my-2" dir="rtl">
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
              <Lang lang={lang} ar={"الأخبار"} en={"news"} />
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="bg-gradient-to-br from-forest-900 via-forest-800 py-2 to-sage-900 text-white">
        <div className="container flex justify-between items-center max-sm:flex-col">
          <h1 className="text-3xl md:text-4xl font-bold text-center my-10">
            <Lang lang={lang} ar={"أخبار الجامعة"} en={"University News"} />
          </h1>
          <SearchInput
            query="query"
            className="max-w-sm placeholder:text-background/80"
            placeholder="البحث عن خبر ... "
          />
        </div>
      </div>
      <div className="container">
        <div className="grid my-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, i) => (
            <ReusableCard
              href={`/${lang}/news/${item.id}`}
              key={item.id}
              news={{
                featured: i === 0 ? true : false,
                image: item.image,
                category: {
                  ar: "أخبار",
                  en: "News",
                },
                date: item.createdAt.toLocaleString(),
                excerpt: {
                  ar: item?.arContent?.body ?? "",
                  en: item?.enContent?.body ?? "",
                },
                id: item.id,
                title: {
                  ar: item?.arContent?.title ?? "",
                  en: item?.enContent?.title ?? "",
                },
              }}
              locale={lang}
              featured={false}
              className="animate-fade-in"
              style={{ animationDelay: `${(i + 2) * 0.1}s` }}
              priority={i < 3 ? true : false}
            />
          ))}
        </div>
        {totalPages > 1 && (
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
                    href={
                      pageParam < totalPages ? `?page=${pageParam + 1}` : "#"
                    }
                    aria-disabled={pageParam === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </main>
  );
};

export default page;
