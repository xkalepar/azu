import { Locale } from "../../i18n-config";
import NewsBar from "./components/news/newsBar";
import ImageGridView from "./components/image-grid-view";
import {
  getCollages,
  getConferences,
  getMagazines,
  getUniNews,
  getUniversity,
} from "@/prisma/seed";
import { getDictionary } from "@/get-dictionary";
import { cn } from "@/lib/utils";
import { FaUniversity } from "react-icons/fa";
import AnimatedCard from "./components/animated-card";
import Statiscs from "./components/statiscs";
import CardPreview from "../components/card-preview";
import Link from "next/link";
import { buttonVariants } from "@/lib/constant";
import { ReactNode } from "react";
import { GiTeacher } from "react-icons/gi";
import Lang from "./components/lang";
//test
export default async function home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  const collages = await getCollages();
  const univeristy = await getUniversity();
  const news = await getUniNews({ page: 1, take: 9 });
  const conferences = await getConferences({ page: 1, qty: 9 });
  const magazines = await getMagazines({ page: 1, qty: 9 });

  return (
    <main>
      <div className="bg-[url('/bg.jpeg')] bg-center bg-cover h-screen min-h-screen relative -z-[1] container text-center">
        <div className="z-10 min-w-full min-h-full bg-black  absolute top-0 left-0 opacity-40"></div>
        <div className="h-full w-full flex relative z-50 justify-center flex-col items-center">
          <AnimatedCard XorY="x">
            <div
              className={cn(
                "font-bold   text-white flex justify-center  gap-5 items-center"
              )}
            >
              <FaUniversity size={128} className="hidden md:block" />
              <div className="flex flex-col justify-between gap-1">
                <div className=" relative z-[100]"></div>
                <h1 className="text-3xl my-4">
                  {dictionary["pages"]["univeristy"]["overview"]["title"]}
                </h1>
              </div>
            </div>
            <p className="text-white">
              {dictionary["pages"]["univeristy"]["overview"]["bio"]}
            </p>
          </AnimatedCard>
        </div>
      </div>
      <main className=" container ">
        <AnimatedCard XorY="x" intialX={100}>
          <NewsBar
            className="py-8"
            content={dictionary.pages["univeristy"]["overview"]["info"]}
          />
        </AnimatedCard>
        <h3 className="text-xl text-center my-4 font-bold">
          {<Lang lang={lang} ar={"معرض الصور"} en={"Gallery"} />}
        </h3>
        {univeristy !== undefined &&
        univeristy !== null &&
        univeristy.gallery.length > 0 ? (
          <ImageGridView list={univeristy.gallery} />
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
        <h2 className="text-xl text-center my-4 font-bold">
          {dictionary.pages.univeristy["overview"]["statistics"]}
        </h2>
        <Statiscs />

        <h3 className="text-xl text-center my-4 font-bold">
          {<Lang lang={lang} ar={"اخر الأخبار"} en={"Latest News"} />}
        </h3>
        {news.length === 0 && (
          <div>
            <Lang
              ar={"لا يوجد أخبار"}
              en={"no news have been uploaded yet"}
              lang={lang}
            />
          </div>
        )}
        <div className="grid md:grid-cols-2 gap-2 my-4 sm:grid-cols-3 lg:grid-cols-4">
          {news.map((item, i) => (
            <AnimatedCard key={i} XorY="x" intialX={20}>
              <CardPreview
                className=" min-h-[300px]"
                title={
                  lang === "en"
                    ? item?.enContent?.title
                    : item?.arContent?.title
                }
                src={item.image}
                lang={lang}
                href={`/news/${item.id}`}
              ></CardPreview>
            </AnimatedCard>
          ))}
        </div>
        <Link
          className={cn(
            buttonVariants.variants.variant.link,
            buttonVariants.variants.size.default,
            buttonVariants.default,
            "mx-auto w-fit mb-2"
          )}
          href={`${lang}/news`}
        >
          {dictionary.pages.univeristy.overview.allnews}
        </Link>

        {/* conferences */}
        <h3 className="text-xl text-center my-4 font-bold">
          {<Lang lang={lang} ar={"اخر المؤتمرات"} en={"Latest Conferences"} />}
        </h3>
        {conferences.length === 0 && (
          <div>
            <Lang
              ar={"لا يوجد مؤتمرات"}
              en={"no conferences have been uploaded yet"}
              lang={lang}
            />
          </div>
        )}
        <div className="grid md:grid-cols-2 gap-2 my-4 sm:grid-cols-3 lg:grid-cols-4">
          {conferences.map((item, i) => (
            <AnimatedCard key={i} XorY="x" intialX={20}>
              <CardPreview
                className=" min-h-[300px]"
                title={
                  lang === "en"
                    ? item?.enContent?.title
                    : item?.arContent?.title
                }
                src={item.logo}
                lang={lang}
                href={`/conferences/${item.id}`}
              ></CardPreview>
            </AnimatedCard>
          ))}
        </div>
        <Link
          className={cn(
            buttonVariants.variants.variant.link,
            buttonVariants.variants.size.default,
            buttonVariants.default,
            "mx-auto w-fit mb-2"
          )}
          href={`${lang}/conferences`}
        >
          <Lang ar={"كل المؤتمرات"} en={"conferences"} lang={lang} />
        </Link>
        {/*  */}
        {/* magazines */}
        <h3 className="text-xl text-center my-4 font-bold">
          {<Lang lang={lang} ar={"اخر مجلات"} en={"Latest magazines"} />}
        </h3>
        {magazines.length === 0 && (
          <div>
            <Lang
              ar={"لا يوجد مجلات بعد"}
              en={"no magazines have been uploaded yet"}
              lang={lang}
            />
          </div>
        )}
        <div className="grid md:grid-cols-2 gap-2 my-4 sm:grid-cols-3 lg:grid-cols-4">
          {magazines.map((item, i) => (
            <AnimatedCard key={i} XorY="x" intialX={20}>
              <CardPreview
                className=" min-h-[300px]"
                title={
                  lang === "en"
                    ? item?.enContent?.title
                    : item?.arContent?.title
                }
                src={item.logo}
                lang={lang}
                href={`/magazine/${item.id}`}
              ></CardPreview>
            </AnimatedCard>
          ))}
        </div>
        <Link
          className={cn(
            buttonVariants.variants.variant.link,
            buttonVariants.variants.size.default,
            buttonVariants.default,
            "mx-auto w-fit mb-2"
          )}
          href={`${lang}/magazine`}
        >
          <Lang ar={"كل مجلات"} en={"magazine"} lang={lang} />
        </Link>
        {/*  */}

        <h3 className="text-xl text-center my-4 font-bold">
          {<Lang lang={lang} ar={"روابط سريعة"} en={"Quick Access"} />}
        </h3>
        <div className="grid md:grid-cols-2 gap-2 my-4 sm:grid-cols-3 lg:grid-cols-4">
          <FastLink
            title={dictionary.pages.univeristy.overview.links.education}
          >
            <GiTeacher />
          </FastLink>
          <FastLink
            title={dictionary.pages.univeristy.overview.links.admission}
          >
            <GiTeacher />
          </FastLink>
          <FastLink title={dictionary.pages.univeristy.overview.links.library}>
            <GiTeacher />
          </FastLink>
          <FastLink title={dictionary.pages.univeristy.overview.links.archive}>
            <GiTeacher />
          </FastLink>
        </div>
        <h4 className=" font-semibold text-xs my-4">
          {dictionary.pages.univeristy.overview.sign.title}
        </h4>
        <p>{dictionary.pages.univeristy.overview.sign.content}</p>
        <Link
          href={"/soon"}
          className={cn(
            buttonVariants.default,
            buttonVariants.variants.size.default,
            buttonVariants.variants.variant.default,
            "my-4"
          )}
        >
          <Lang ar={"من هنا"} en={"here"} lang={lang} />
        </Link>
        <h3 className="text-xl text-center my-4 font-bold">
          {<Lang lang={lang} ar={"الكليات"} en={"Collages"} />}
        </h3>
        <div className="grid gap-1 md:grid-cols-2 my-4 sm:grid-cols-3 xl:gap-5 sm:gap-3 lg:grid-cols-4">
          {
            <Lang
              lang={lang}
              ar={collages?.map((collage, i) => (
                <AnimatedCard key={i} XorY="x" intialX={i % 2 ? -20 : 20}>
                  <CardPreview
                    lang={lang}
                    href={`/collages/${collage.id}`}
                    src={collage.logo}
                    title={collage.ArCollageData?.title}
                  />
                </AnimatedCard>
              ))}
              en={collages?.map((collage, i) => (
                <AnimatedCard key={i} XorY="x" intialX={i % 2 ? -20 : 20}>
                  <CardPreview
                    lang={lang}
                    key={i}
                    href={`/collages/${collage.id}`}
                    src={collage.logo}
                    title={collage.EnCollageData?.title}
                  />
                </AnimatedCard>
              ))}
            />
          }
        </div>
      </main>
    </main>
  );
}

interface FastLinkProps {
  href?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

const FastLink = ({
  href = "soon",
  title,
  children,
  className,
}: FastLinkProps) => {
  return (
    <Link href={href} className="w-full">
      <div
        className={cn(
          className,
          "flex w-full justify-center items-center gap-2",
          "rounded-md bg-background hover:bg-card transition-all px-4 py-2"
        )}
      >
        <div>{children}</div>
        <p>{title}</p>
      </div>
    </Link>
  );
};
