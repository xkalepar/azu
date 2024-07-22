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
import Lang from "../components/lang";
import { cutString } from "@/lib/utils";
import ParseData from "@/app/components/parse-data";
import { Metadata } from "next";
import { getDir } from "../components/footers/home-footer";
import { env } from "process";
type Lang = "en" | "ar";
export const metadata: Metadata = {
  title: "المجلات العلمية",
};
const page = async ({ params }: { params: { lang: Lang } }) => {
  const { lang } = params;
  const magazines = await getMagazines({
    page: 1,
    qty: 20,
    linkedId: env.UniveristyId
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
              href={`/${lang}/magazine/${item.id}`}
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
