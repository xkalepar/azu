import CardPreview from "@/app/components/card-preview";
import { getMagazines } from "@/prisma/seed";
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
import { env } from "process";
import Lang from "@/app/[lang]/components/lang";
import { getDir } from "@/app/[lang]/components/footers/home-footer";
type Lang = "en" | "ar";
export const metadata: Metadata = {
  title: "المجلات العلمية",
};
const page = async ({ params }: { params: { lang: Lang, collage: string } }) => {
  const { lang } = params;
  const magazines = await getMagazines({
    page: 1,
    qty: 20,
    linkedId: params.collage
  });
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
              href={`/${lang}/magazines/${item.id}`}
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
