import { Locale } from "../../i18n-config";
import {
  getConferences,
  getMagazines,
  getUniNews,
  getUniversity,
} from "@/prisma/seed";
import { getDictionary } from "@/get-dictionary";
import { cn } from "@/lib/utils";
import { GrGallery } from "react-icons/gr";
import Statiscs from "./components/statiscs";
import Link from "next/link";
import { buttonVariants } from "@/lib/constant";
import Lang from "./components/lang";
import Hero from "@/components/sections/hero-section";
import ReusableCard from "@/components/reusable-card";
import Gallery from "@/components/gallery";
import { CustomLink } from "@/components/custom-link";
import QuickAccess from "@/components/sections/quick-access";
import CollegesSection from "@/components/sections/collage-section";
import { BsNewspaper } from "react-icons/bs";
import { ArrowRight } from "lucide-react";
import { GiVideoConference } from "react-icons/gi";
import { FaBook } from "react-icons/fa6";

export default async function home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  const univeristy = await getUniversity();
  const { news } = await getUniNews({ page: 1, take: 9 });
  const { conferences } = await getConferences({ page: 1, take: 9 });
  const { magazines } = await getMagazines({ page: 1, qty: 9 });
  const images = univeristy?.gallery?.slice(0, 10)?.reverse() || [];

  return (
    <main>
      <Hero locale={lang} />
      <div className="">
        <section className="my-10">
          <Statiscs lang={lang} />
        </section>

        <section id="news" className="my-10 container py-4">
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
                ? "تابع آخر الأخبار والمستجدات من جامعة الزيتونة"
                : "Stay updated with the latest news and updates from Al-Zaytouna University"}
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
        </section>

        <section id="conferences" className="my-10 bg-secondary py-10">
          <div className="container">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-forest-500 rounded-full flex items-center justify-center mr-3 rtl:mr-0 rtl:ml-3">
                  <GiVideoConference className="h-6 w-6 text-white" />
                </div>
                <div className="h-1 w-20 bg-gradient-to-r from-forest-500 to-sage-500 rounded"></div>
              </div>

              <h4 className="text-4xl md:text-5xl font-bold text-forest-800 mb-6">
                <Lang
                  lang={lang}
                  ar={"اخر المؤتمرات"}
                  en={"Latest Conferences"}
                />{" "}
              </h4>

              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {lang === "ar"
                  ? "تابع أحدث المؤتمرات والفعاليات من جامعة الزيتونة"
                  : "Stay updated with the latest conferences and events from Al-Zaytouna University"}
              </p>
            </div>
            {conferences.length === 0 && (
              <div>
                <Lang
                  ar={"لا يوجد مؤتمرات"}
                  en={"no conferences have been uploaded yet"}
                  lang={lang}
                />
              </div>
            )}
            <div className="grid my-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {conferences.map((item, i) => (
                <ReusableCard
                  href={`/${lang}/conferences/${item.id}`}
                  key={item.id}
                  news={{
                    featured: true,
                    image: item.logo,
                    category: {
                      ar: "مؤتمرات",
                      en: "Conferences",
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
                href={`${lang}/conferences`}
              >
                <Lang ar={"كل المؤتمرات"} en={"conferences"} lang={lang} />
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
                ? "تابع أحدث المجلات من جامعة الزيتونة"
                : "Stay updated with the latest magazines from Al-Zaytouna University"}
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

        <section id="gallery" className="my-10 bg-secondary py-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-forest-500 rounded-full flex items-center justify-center mr-3 rtl:mr-0 rtl:ml-3">
                <GrGallery className="h-6 w-6 text-white" />
              </div>
              <div className="h-1 w-20 bg-gradient-to-r from-forest-500 to-sage-500 rounded"></div>
            </div>

            <h4 className="text-4xl md:text-5xl font-bold text-forest-800 mb-6">
              <Lang lang={lang} ar={"المعرض"} en={"Gallery"} />
            </h4>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {lang === "ar"
                ? "استعرض صور فعاليات وإنجازات جامعة الزيتونة ترهونة"
                : "Browse photos of events and achievements at Al-Zaytouna University Tarhuna"}
            </p>
          </div>
          {univeristy !== undefined &&
          univeristy !== null &&
          univeristy.gallery.length > 0 ? (
            <>
              <Gallery
                arAlt="صور الجامعة"
                enAlt="University Photos"
                images={images}
              />
              <div className="text-center">
                <CustomLink
                  size="lg"
                  className="bg-gradient-to-r mx-auto max-w-sm flex from-forest-600 to-sage-600 hover:from-forest-700 hover:to-sage-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  href={`/${lang}/gallery`}
                >
                  <Lang lang={lang} ar={"كل الصور"} en={"All Photos"} />
                  <ArrowRight className="ml-2 h-5  w-5 rtl:ml-0 rtl:mr-2 rtl:rotate-180" />
                </CustomLink>
              </div>
            </>
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
        </section>
        <QuickAccess locale={lang} />
        <CollegesSection locale={lang} />
        <section
          // dir={lang === "ar" ? "rtl" : "ltr"}
          className="my-16 container rounded-3xl bg-gradient-to-br from-sage-50 via-white to-forest-50 shadow-lg px-6 py-12 md:py-20 flex flex-col items-center"
        >
          <div className="flex flex-col md:flex-row items-start text-start justify-center gap-8 mb-10">
            <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 bg-forest-500 rounded-full shadow-lg">
              <GrGallery className="h-10 w-10 text-white" />
            </div>
            <div className="flex-1 text-center md:text-start">
              <h4 className="text-3xl md:text-5xl font-extrabold text-forest-800 mb-4 tracking-tight">
                {dictionary.pages.univeristy.overview.sign.title}
              </h4>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto md:mx-0 leading-relaxed mb-2">
                {lang === "ar"
                  ? "تضم جامعة الزيتونة أكثر من 19 كلية متميزة تقدم برامج أكاديمية شاملة في مختلف التخصصات"
                  : "Al-Zaytouna University comprises more than 19 distinguished faculties offering comprehensive academic programs across various specializations"}
              </p>
              <p className="text-base text-gray-500 max-w-2xl mx-auto md:mx-0 mb-4">
                {dictionary.pages.univeristy.overview.sign.content}
              </p>
              <CustomLink
                href={`/${lang}/soon`}
                className="bg-gradient-to-r  w-fit flex from-forest-600 to-sage-600 hover:from-forest-700 hover:to-sage-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Lang ar="من هنا" en="here" lang={lang} />
              </CustomLink>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
