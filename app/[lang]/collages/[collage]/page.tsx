import {
  getCollageById,
  getCollages,
  getMagazines,
  getNews,
} from "@/prisma/seed";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import Lang from "../../components/lang";
import Link from "next/link";
import { cn } from "@/lib/utils";
import AnimatedCard from "../../components/animated-card";
import CardPreview from "@/app/components/card-preview";
import Statiscs from "../../components/statiscs";
import { getDictionary } from "@/get-dictionary";
import { buttonVariants } from "@/lib/constant";
import Gallery from "@/components/gallery";
import { CustomLink } from "@/components/custom-link";
import { ArrowRight } from "lucide-react";
import { FaBook } from "react-icons/fa";
import ReusableCard from "@/components/reusable-card";
import { BsNewspaper } from "react-icons/bs";
import CollageHeroSection from "@/components/sections/collage-hero-section";
export async function generateMetadata({
  params,
}: {
  params: { collage: string; lang: "ar" | "en" };
}): Promise<Metadata> {
  const collage = await getCollageById(params.collage);
  if (!collage) {
    return {
      title: "404 غير موجود",
    };
  }
  return {
    title: collage.ArCollageData!.title,
    description: collage.ArCollageData!.content,
    icons: collage.logo,
  };
}
export async function generateStaticParams() {
  const collages = await getCollages();
  return collages.map((collage) => ({ id: collage.id }));
}

const collagePage = async ({
  params,
}: {
  params: { collage: string; lang: "ar" | "en" };
}) => {
  const collage = await getCollageById(params.collage);
  if (!collage) return notFound();
  const { lang } = params;
  const dictionary = await getDictionary(lang);
  const news = await getNews({ collageId: params.collage });
  const { magazines } = await getMagazines({
    page: 1,
    qty: 9,
    linkedId: params.collage,
  });
  return (
    <main>
      {/* <div className="bg-[url('/bg.jpeg')] bg-center bg-cover h-screen min-h-screen relative -z-[1] text-center">
        <div className="z-10 min-w-full min-h-full bg-black absolute top-0 left-0 opacity-40"></div>
        <div className="h-full w-full flex relative z-50 justify-center flex-col items-center">
          <AnimatedCard XorY="x">
            <div
              className={cn(
                "font-bold   text-white flex justify-center  gap-5 items-center"
              )}
            >
              <div className="flex flex-col justify-between gap-1">
                <div className=" relative z-[100]"></div>
                <h1 className="text-3xl my-4">
                  <Lang
                    lang={lang}
                    ar={collage.ArCollageData?.title}
                    en={collage.EnCollageData?.title}
                  />
                </h1>
              </div>
            </div>
            <p className="text-white">
              <Lang lang={lang} ar={collage.welcome} en={collage.enWelcome} />{" "}
            </p>
          </AnimatedCard>
        </div>
      </div> */}
      <CollageHeroSection
        locale={lang}
        title={
          lang === "ar"
            ? collage.ArCollageData?.title ?? "كلية غير موجودة"
            : collage.EnCollageData?.title ?? "Collage not found"
        }
      />
      <div className="container">
        <h3 className="text-xl text-center my-4 font-bold">
          {<Lang lang={lang} ar={"معرض الصور"} en={"Gallery"} />}
        </h3>
        {collage !== undefined &&
        collage !== null &&
        collage.gallery.length > 0 ? (
          <Gallery
            arAlt={collage.ArCollageData?.title ?? "صور الكلية"}
            enAlt={collage.EnCollageData?.title ?? "Collage Photos"}
            images={collage.gallery?.slice(0, 9)?.reverse() ?? []}
          />
        ) : (
          <div>
            {
              <Lang
                lang={lang}
                ar={"لا يوجد صور بعد"}
                en={"no pics have been uploaded yet"}
              />
            }
          </div>
        )}
      </div>
      <div>
        {/* <Statiscs lang={lang} /> */}
        <section id="news" className="my-10 bg-secondary py-4">
          <div className="container">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-forest-500 rounded-full flex items-center justify-center mr-3 rtl:mr-0 rtl:ml-3">
                  <BsNewspaper className="h-6 w-6 text-white" />
                </div>
                <div className="h-1 w-20 bg-gradient-to-r from-forest-500 to-sage-500 rounded"></div>
              </div>

              <h4 className="text-4xl md:text-5xl font-bold text-forest-800 mb-6">
                {<Lang lang={lang} ar={"اخر الأخبار"} en={"Latest News"} />}
              </h4>

              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {lang === "ar"
                  ? `تابع أحدث الأخبار من ${collage.ArCollageData?.title}`
                  : `Stay updated with the latest news from ${collage.EnCollageData?.title}`}
              </p>
            </div>
            {news.length === 0 && (
              <div>
                <Lang
                  ar={"لا يوجد أخبار"}
                  en={"no news have been uploaded yet"}
                  lang={lang}
                />
              </div>
            )}
            <div className="grid my-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item, i) => (
                <ReusableCard
                  href={`/${lang}/news/${item.id}`}
                  key={item.id}
                  news={{
                    featured: true,
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
                />
              ))}
            </div>
            <div className="text-center">
              <CustomLink
                size="lg"
                className="bg-gradient-to-r mx-auto max-w-sm flex from-forest-600 to-sage-600 hover:from-forest-700 hover:to-sage-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                href={`${lang}/news`}
              >
                {dictionary.pages.univeristy.overview.allnews}
                <ArrowRight className="ml-2 h-5  w-5 rtl:ml-0 rtl:mr-2 rtl:rotate-180" />
              </CustomLink>
            </div>
          </div>
        </section>
        {/* magazines */}
        <section id="magazines" className="my-10 container">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-forest-500 rounded-full flex items-center justify-center mr-3 rtl:mr-0 rtl:ml-3">
                <FaBook className="h-6 w-6 text-white" />
              </div>
              <div className="h-1 w-20 bg-gradient-to-r from-forest-500 to-sage-500 rounded"></div>
            </div>

            <h4 className="text-4xl md:text-5xl font-bold text-forest-800 mb-6">
              <Lang lang={lang} ar={"اخر المجلات"} en={"Latest magazines"} />
            </h4>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {lang === "ar"
                ? `تابع أحدث المجلات من ${collage.ArCollageData?.title}`
                : `Stay updated with the latest magazines from ${collage.EnCollageData?.title}`}
            </p>
          </div>

          {magazines.length === 0 && (
            <div>
              <Lang
                ar={"لا يوجد مجلات بعد"}
                en={"no magazines have been uploaded yet"}
                lang={lang}
              />
            </div>
          )}
          <div className="grid my-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {magazines.map((item, i) => (
              <ReusableCard
                href={`/${lang}/magazine/${item.id}`}
                key={item.id}
                news={{
                  featured: true,
                  image: item.logo,
                  category: {
                    ar: "مجلات",
                    en: "Magazines",
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
              />
            ))}
          </div>
          <div className="text-center">
            <CustomLink
              size="lg"
              className="bg-gradient-to-r mx-auto max-w-sm flex from-forest-600 to-sage-600 hover:from-forest-700 hover:to-sage-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              href={`/${lang}/magazine`}
            >
              <Lang ar={"كل المجلات"} en={"magazine"} lang={lang} />
              <ArrowRight className="ml-2 h-5  w-5 rtl:ml-0 rtl:mr-2 rtl:rotate-180" />
            </CustomLink>
          </div>
        </section>
      </div>
    </main>
  );
};

export default collagePage;
