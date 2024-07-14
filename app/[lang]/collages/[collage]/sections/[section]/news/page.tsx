import CardPreview from "@/app/components/card-preview";
import { getCollageById, getNews, getNewsForSection, getSectionById, getUniNews } from "@/prisma/seed";
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
import { Metadata } from "next";
import Lang from "@/app/[lang]/components/lang";
import { getDir } from "@/app/[lang]/components/footers/home-footer";
export const generateMetadata = async (
  { params }: { params: { section: string; lang: "ar" | "en" } }
): Promise<Metadata> => {
  const { section: sectionId, lang } = params
  const section = await getSectionById(sectionId)
  return {
    title: lang === "ar" ? `أخبار ${section?.ArContent?.title}` : `the news of ${section?.EnContent?.title}`,
  };
}

const page = async ({ params }: { params: { lang: "ar" | "en"; collage: string, section: string } }) => {
  const { lang, collage: collageId, section: sectionId } = params;
  const news = await getNewsForSection({ sectionId });
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
              <Lang lang={lang} ar={"الأخبار"} en={"news"} />
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid md:grid-cols-2 my-2 sm:grid-cols-3 gap-2 lg:grid-cols-4">
        {news.map((item, index) => {
          return (
            <CardPreview
              src={item.image}
              key={index}
              className="h-[400px]"
              href={`/${lang}/collages/${collageId}/sections/${sectionId}/news/${item.id}`}
              alt={
                lang === "ar" ? item.arContent?.title : item.enContent?.title
              }
              title={
                lang === "ar" ? item.arContent?.title : item.enContent?.title
              }
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
    </main>
  );
};

export default page;
