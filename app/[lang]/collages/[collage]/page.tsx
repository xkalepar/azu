// import Statiscs from "@/app/[lang]/components/statiscs";
import ParseData from "@/app/components/parse-data";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { getCollageById, getCollages } from "@/prisma/seed";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import { Suspense } from "react";
import Statiscs from "../../components/statiscs";
import AnimatedCard from "../../components/animated-card";
import Footer from "../../components/footer";
export async function generateMetadata({
  params,
}: {
  params: { collage: string };
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
    // keywords: [collage.name, ...collage.categories.map((c) => c.name)],
  };
}

export async function generateStaticParams() {
  const collages = await getCollages();
  return collages.map((collage) => ({ id: collage.id }));
}

const collagePage = async ({ params }: { params: { collage: string } }) => {
  const collage = await getCollageById(params.collage);
  if (!collage) return notFound();
  return (
    <div className="container xl:mx-4 xl:px-4">
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
      ></Suspense>
      <ParseData content={collage.ArCollageData!.content} />
    </div>
  );
};

export default collagePage;
