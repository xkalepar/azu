import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import Lang from "@/app/[lang]/components/lang";
import { getDir } from "@/app/[lang]/components/footers/home-footer";
import { getUniversity } from "@/prisma/seed";
import RemoteImage from "@/components/remote-image";
import Gallery from "@/components/gallery";
import BreadCrumbsSepratorLang from "../components/bread-crumbs-seprator";

export async function generateMetadata({
  params,
}: {
  params: { lang: "ar" | "en" };
}) {
  return {
    title:
      params.lang === "ar"
        ? "معرض الصور | جامعة الزيتونة ترهونة"
        : "Gallery | Al-Zaytouna University Tarhuna",
    description:
      params.lang === "ar"
        ? "استعرض صور فعاليات وإنجازات جامعة الزيتونة ترهونة."
        : "Browse photos of events and achievements at Al-Zaytouna University Tarhuna.",
  };
}

type PageProps = {
  params: { lang: Locale };
};

const GalleryPage = async ({ params }: PageProps) => {
  const { lang } = params;
  const univeristy = await getUniversity();

  // Expecting: [{ src: string, alt?: string, titleAr?: string, titleEn?: string }]
  const images = univeristy?.gallery || [];

  return (
    <main className="container">
      <Breadcrumb dir={getDir(lang)}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${lang}`}>
                <Lang lang={lang} ar="الرئيسية" en="Home" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadCrumbsSepratorLang />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Lang lang={lang} ar="معرض الصور" en="Gallery" />
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-bold my-6 text-center">
        <Lang lang={lang} ar="معرض الصور" en="Gallery" />
      </h1>
      {/* <div className="grid my-10 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((img, idx) => {
          const src = img;
          const alt = `gallery image -${idx}`;
          return (
            <div
              key={idx}
              className="rounded shadow overflow-hidden bg-white flex flex-col"
            >
              <div className="relative w-full aspect-[4/3]">
                <RemoteImage
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority={idx < 4}
                />
              </div>
            </div>
          );
        })}
      </div> */}
      <Gallery arAlt="صور الجامعة" enAlt="University Photos" images={images} />
    </main>
  );
};

export default GalleryPage;
