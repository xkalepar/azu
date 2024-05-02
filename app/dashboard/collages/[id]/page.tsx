// import Statiscs from "@/app/[lang]/components/statiscs";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { getCollageById, getCollages } from "@/prisma/seed";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import { Suspense } from "react";

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
    title: collage.ArCollageData!.name,
    description: collage.ArCollageData!.origin,
    // keywords: [collage.name, ...collage.categories.map((c) => c.name)],
  };
}

export async function generateStaticParams() {
  const collages = await getCollages();
  return collages.map((collage) => ({ id: collage.id }));
}

const collagePage = async ({ params }: { params: { id: string } }) => {
  const collage = await getCollageById(params.id);
  if (!collage) return notFound();
  return (
    <div className="flex justify-between items-start flex-col sm:flex-row px-4 py-2">
      <section className="flex-1">
        <div className="w-full mx-auto" dir="rtl">
          <div className={cn("mt-4 ")}>
            <div className="flex flex-col-reverse sm:flex-row gap-4 my-3">
              <div className="flex-0 sm:w-3/4 sm:text-justify">
                <h2 className="group mb-1 font-normal text-base transition-all w-fit">
                  تأسيس الكلية
                </h2>
                <p className="text-sm">{collage.ArCollageData?.origin}</p>
              </div>

              {/* <div className="w-full h-[300px] rounded-sm overflow-hidden my-2">
                <Suspense fallback={<Skeleton className="w-full h-full" />}>
                  <Image
                    src={collage.logo}
                    alt={collage.id}
                    loading="lazy"
                    width={1000}
                    height={1000}
                    className=" object-cover w-full h-full"
                  />
                </Suspense>
              </div> */}
            </div>
            <div>
              <div className="my-1" />
              <h3 className="group  mb-1 font-normal text-base  w-fit">
                رؤية ورسالة واهداف الكلية
              </h3>
              <p className="text-sm">{collage.ArCollageData?.goals}</p>
            </div>
            <div>
              <div className="my-1" />
              <h3 className="group  mb-1 font-normal text-base w-fit">
                الأعتماد و التصنيف
              </h3>
              <p className="text-sm">{collage.ArCollageData?.rating}</p>
            </div>
            {/* <div>
              <div className="my-1" />
              <Statiscs>
                <h3 className="group  mb-1 font-normal text-base w-fit">
                  احصائيات الجامعة{" "}
                </h3>
              </Statiscs>
            </div> */}

            {/*  */}
            <div>
              <div className="my-1" />
              <h3 className="group  mb-1 font-normal text-base w-fit">
                عمادة الكلية
              </h3>
              <p className="text-sm">{collage.ArCollageData?.management}</p>
            </div>
            {/*  */}
            <div>
              <div className="my-1" />
              <h3 className="group  mb-1 font-normal text-base w-fit">
                مجلس الكلية
              </h3>
              <p className="text-sm">{collage.ArCollageData?.desk}</p>
            </div>

            {/*  */}
            <div>
              <div className="my-1" />
              <h3 className="group  mb-1 font-normal text-base w-fit">
                وكيل الكلية للشؤون العلمية
              </h3>
              <p className="text-sm">{collage.ArCollageData?.shoan}</p>
            </div>

            {/*  */}
            <div>
              <div className="my-1" />
              <h3 className="group  mb-1 font-normal text-base w-fit">
                الهيكل التنظيمي للكلية
              </h3>
              <p className="text-sm">{collage.ArCollageData?.structure}</p>
            </div>

            <div>
              <div className="my-1" />
              <h3 className="group  mb-1 font-normal text-base w-fit">
                سياسات و لوائح
              </h3>
              <ol className=" mx-2">
                {collage.ArCollageData?.List.map((li, index) => {
                  return (
                    <li key={index}>
                      <h4 className="my-1 font-medium">
                        {index + 1}- {li.title}
                      </h4>
                      <p className=" mx-1 text-sm">{li.content}</p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-full h-[200px] overflow-hidden rounded-lg">
          <Suspense fallback={<Skeleton className="w-full h-full" />}>
            <Image
              src={collage.logo}
              alt={collage.id}
              loading="lazy"
              width={1000}
              height={1000}
              className="object-cover w-full h-full"
            />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default collagePage;
