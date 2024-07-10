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
import { getCollageById } from "@/prisma/seed";

export async function generateMetadata({
    params,
}: {
    params: { id: string; lang: "ar" | "en", collage: string };
}): Promise<Metadata> {
    const { id, lang, collage } = params;
    const graduates = await getSpecificData({ id });
    const college = await getCollageById(collage)

    if (!graduates) {
        return {
            title: "404 غير موجود",
        }
    }

    return {
        title:
            lang === "ar"
                ? ` ${college?.ArCollageData?.title} | الدراسات العليا ${graduates?.title}`
                : `${college?.EnCollageData?.title} | graduates studies ${graduates?.title}`,
        description:
            lang === "ar" ? graduates?.body : graduates?.enBody,
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
                            <Link href={`#`}>
                                <Lang lang={lang} ar={"الدراسات العليا"} en={"graduate studies"} />
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            <Lang
                                ar={graduateStudies?.title}
                                en={graduateStudies?.enTitle}
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
                        <ParseData dir="rtl" content={graduateStudies?.body ?? ""} />
                    }
                    en={
                        <ParseData dir="ltr" content={graduateStudies?.enBody ?? ""} />
                    }
                />
            </Suspense>
        </main>
    );
};

export default graduateStudiesPage;
