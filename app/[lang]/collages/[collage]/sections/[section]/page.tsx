import AnimatedCard from '@/app/[lang]/components/animated-card'
import ImageGridView from '@/app/[lang]/components/image-grid-view';
import Lang from '@/app/[lang]/components/lang'
import Statiscs from '@/app/[lang]/components/statiscs';
import CardPreview from '@/app/components/card-preview';
import ParseData from '@/app/components/parse-data';
import { getDictionary } from '@/get-dictionary';
import { buttonVariants } from '@/lib/constant';
import { cn, cutString } from '@/lib/utils';
import { getNewsForSection, getSectionById } from '@/prisma/seed';
import Link from 'next/link';
import React from 'react'

const page = async (
    { params }: { params: { section: string; collage: string; lang: "ar" | "en"; }; }
) => {
    const { collage: collageId, section: sectionId, lang } = params;
    const section = await getSectionById(sectionId);
    const news = await getNewsForSection({ sectionId })
    const dictionary = await getDictionary(lang)
    return (
        <main>
            <div className="bg-[url('/bg.jpeg')] bg-center bg-cover h-screen min-h-screen relative -z-[1] container text-center">
                <div className="z-10 min-w-full min-h-full bg-black absolute top-0 left-0 opacity-40"></div>
                <div className="h-full w-full flex relative z-50 justify-center flex-col items-center">
                    <AnimatedCard XorY="x">
                        <div
                            className={cn(
                                "font-bold text-white flex justify-center  gap-5 items-center"
                            )}
                        >
                            <div className="flex flex-col justify-between gap-1">
                                <div className="relative z-[100]"></div>
                                <h1 className="text-3xl my-4">
                                    <Lang
                                        lang={lang}
                                        ar={section?.ArContent?.title}
                                        en={section?.EnContent?.title}
                                    />
                                </h1>
                            </div>
                        </div>
                        <p className="text-white">
                            <Lang lang={lang} ar={section?.welcome} en={section?.enWelcome} />{" "}
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
                {section !== undefined &&
                    section !== null &&
                    section.gallery.length > 0 ? (
                    <ImageGridView list={section.gallery} />
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
                                href={`/${lang}/collages/${collageId}/sections/${sectionId}/news/${item.id}`}
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
                    href={`/${lang}/collages/${collageId}/sections/${sectionId}/news`}
                >
                    {dictionary.pages.univeristy.overview.allnews}
                </Link>
            </div>
        </main>
    )
}

export default page