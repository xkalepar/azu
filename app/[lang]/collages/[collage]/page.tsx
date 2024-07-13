// import Statiscs from "@/app/[lang]/components/statiscs";
import ParseData from "@/app/components/parse-data";
import { Skeleton } from "@/components/ui/skeleton";
import { getCollageById, getCollages, getNews } from "@/prisma/seed";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import { ReactNode, Suspense } from "react";
import Lang from "../../components/lang";
import Link from "next/link";
import { cn, cutString } from "@/lib/utils";
import AnimatedCard from "../../components/animated-card";
import CardPreview from "@/app/components/card-preview";
import { FaUniversity } from "react-icons/fa";
import Statiscs from "../../components/statiscs";
import { getDictionary } from "@/get-dictionary";
import ImageGridView from "../../components/image-grid-view";
import { buttonVariants } from "@/lib/constant";
import NewsBar from "../../components/news/newsBar";
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

  return (
    <main>
      <div className="bg-[url('/bg.jpeg')] bg-center bg-cover h-screen min-h-screen relative -z-[1] container text-center">
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
      </div>
      <div className="container">
        {/* <AnimatedCard XorY="x" intialX={100}>
          <NewsBar className="py-8" content={collage?.welcome ?? ""} />
        </AnimatedCard> */}
        <h3 className="text-xl text-center my-4 font-bold">
          {<Lang lang={lang} ar={"معرض الصور"} en={"Gallery"} />}
        </h3>
        {collage !== undefined &&
          collage !== null &&
          collage.gallery.length > 0 ? (
          <ImageGridView list={collage.gallery} />
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
        <h3 className="text-xl text-center my-4 font-bold">
          {dictionary.pages.univeristy["overview"]["statistics"]}
        </h3>
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
                title={item?.enContent?.title}
                src={item.image}
                lang={lang}
                href={`/${lang}/news/${item.id}`}
              >
                <div className="w-full my-2">
                  {lang === "ar" ? (
                    <ParseData
                      content={cutString(
                        item.arContent?.body ?? "",
                        200,
                        "المزيد"
                      )}
                    />
                  ) : (
                    <ParseData
                      content={cutString(
                        item.enContent?.body ?? "",
                        200,
                        "more"
                      )}
                    />
                  )}
                </div>
              </CardPreview>
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
          href={`/${lang}/news`}
        >
          {dictionary.pages.univeristy.overview.allnews}
        </Link>
      </div>
    </main>
  );
};


export default collagePage;
