import CardPreview from "@/app/components/card-preview";
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
type Lang = "en" | "ar";
const page = async ({ params }: { params: { lang: Lang } }) => {
  const { lang } = params;
  const news = await getUniNews({
    ar: lang === "ar" ? true : false,
    page: 1,
    query: "",
  });
  return (
    <main className=" container ">
      <Breadcrumb dir="rtl">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${lang}`}>
                <Lang lang={lang} ar={"الرئيسية"} en={"main"} />
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
      <div className="grid md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {lang === "ar"
          ? news.map((item, index) => {
              return (
                <CardPreview
                  src={item.image}
                  alt={item.arContent?.title}
                  key={index}
                  href={`/news/${item.id}`}
                ></CardPreview>
              );
            })
          : news.map((item, index) => {
              return (
                <CardPreview
                  src={item.image}
                  alt={item.enContent?.title}
                  key={index}
                  href={`/news/${item.id}`}
                ></CardPreview>
              );
            })}
      </div>
    </main>
  );
};

export default page;
