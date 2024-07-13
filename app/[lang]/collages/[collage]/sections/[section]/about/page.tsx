// import Statiscs from "@/app/[lang]/components/statiscs";
import Lang from "@/app/[lang]/components/lang";
import ParseData from "@/app/components/parse-data";
import { Skeleton } from "@/components/ui/skeleton";
import { getCollageById, getCollages, getSectionById } from "@/prisma/seed";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import { Suspense } from "react";
export async function generateMetadata({
    params,
}: {
    params: { section: string; lang: "ar" | "en" };
}): Promise<Metadata> {
    const { section: sectionId } = params;
    const section = await getSectionById(sectionId);
    if (!section) {
        return {
            title: "404 غير موجود",
        };
    }
    return {
        title: section.ArContent!.title,
        description: section.ArContent!.body,
        icons: section.Collage?.logo,
    };
}
export async function generateStaticParams() {
    const collages = await getCollages();
    return collages.map((collage) => ({ id: collage.id }));
}

const aboutPage = async ({
    params,
}: {
    params: { section: string; lang: "ar" | "en" };
}) => {
    const { section: sectionId } = params;
    const section = await getSectionById(sectionId);

    if (!section) return notFound();
    const { lang } = params;
    return (
        <main className="container xl:mx-4 xl:px-4">
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
                    ar={<ParseData dir="rtl" content={section?.ArContent?.body ?? ""} />}
                    en={<ParseData dir="ltr" content={section?.EnContent?.body ?? ""} />}
                />
            </Suspense>
        </main>
    );
};

export default aboutPage;
