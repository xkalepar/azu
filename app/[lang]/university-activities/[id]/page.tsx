// import Statiscs from "@/app/[lang]/components/statiscs";
import ParseData from "@/app/components/parse-data";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import { Suspense } from "react";
import Lang from "../../components/lang";
import {
  getCenter,
  getCenters,
} from "@/app/dashboard/university/university-activities/seed";
export async function generateMetadata({
  params,
}: {
  params: { id: string; lang: "ar" | "en" };
}): Promise<Metadata> {
  const { id } = params;
  const center = await getCenter({ id });
  if (!center) {
    return {
      title: "404 غير موجود",
    };
  }
  return {
    title: center.arContent!.title,
    description: center.arContent!.body,
  };
}

export async function generateStaticParams() {
  const centers = await getCenters();
  return centers.map((id) => ({ id: id.id }));
}

const centerPage = async ({
  params,
}: {
  params: { id: string; lang: "ar" | "en" };
}) => {
  const { id } = params;
  const center = await getCenter({ id });
  if (!center) {
    return notFound();
  }
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
          ar={<ParseData dir="rtl" content={center.arContent?.body ?? ""} />}
          en={<ParseData dir="ltr" content={center.enContent?.body ?? ""} />}
        />
      </Suspense>
    </main>
  );
};

export default centerPage;
