// import Statiscs from "@/app/[lang]/components/statiscs";
import ParseData from "@/app/components/parse-data";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import { Suspense } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

import Lang from "@/app/[lang]/components/lang";
import { getData, getSpecificData } from "@/app/dashboard/collages/[id]/graduate-studies/seed";

export async function generateMetadata({
    params,
}: {
    params: { id: string; lang: "ar" | "en" };
}): Promise<Metadata> {
    const { id, lang } = params;
    const graduates = await getSpecificData({ id });
    if (!graduates) {
        return {
            title: "404 غير موجود",
        };
    }

    return {
        title:
            lang === "ar"
                ? ` ${graduates.Collage[0].ArCollageData?.title} | الدراسات العليا ${graduates.Pages[0]?.title}`
                : `${graduates.Collage[0].EnCollageData?.title} | graduates studies ${graduates.Pages[0]?.title}`,
        description:
            lang === "ar" ? graduates.Pages[0]?.body : graduates.Pages[0]?.enBody,
    };
}

export async function generateStaticParams({ params: { collage } }: { params: { collage: string } }) {
    const conferences = await getData({ id: collage });
    return conferences.map((id) => ({ id: id.id }));
}

const graduateStudiesPage = async ({
    params,
}: {
    params: { id: string; lang: "ar" | "en" };
}) => {
    const { id } = params;
    const graduateStudies = await getSpecificData({ id });

    if (!graduateStudies) {
        return notFound();
    }
    const { lang } = params;
    return (
        <main className="container xl:mx-4 xl:px-4">
            <Breadcrumb>
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
                        <BreadcrumbLink asChild>
                            <Link href={`/${lang}/graduate-studies`}>
                                <Lang lang={lang} ar={"الدراسات العليا"} en={"graduate studies"} />
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            <Lang
                                ar={graduateStudies.Pages[0]?.title}
                                en={graduateStudies.Pages[0]?.enTitle}
                                lang={lang}
                            />
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Suspense
                fallback={
                    <>
                        <Skeleton className=" min-w-full max-w-full min-h-full"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                        <Skeleton className=" min-w-full h-1 my-1"></Skeleton>
                    </>
                }
            >
                <Lang
                    lang={lang}
                    ar={
                        <ParseData dir="rtl" content={graduateStudies.Pages[0]?.body ?? ""} />
                    }
                    en={
                        <ParseData dir="ltr" content={graduateStudies.Pages[0]?.body ?? ""} />
                    }
                />
            </Suspense>
        </main>
    );
};

export default graduateStudiesPage;
