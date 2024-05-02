import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Title from "../components/title";
import Link from "next/link";
import { IoIosAdd } from "react-icons/io";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/lib/constant";
import { getCollages, aa } from "@/prisma/seed";
import Image from "next/image";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const collagesPage = async () => {
  await aa();
  const collages = await getCollages();
  return (
    <main>
      <Title className="text-xl font-normal pr-4 pt-4" title={"الكليات"}>
        <div className="w-full relative">
          <Breadcrumbs />
          <Link
            href={"/dashboard/collages/new"}
            className={cn(
              "absolute left-2 top-2",
              buttonVariants.default,
              buttonVariants.variants.variant.default,
              buttonVariants.variants.size.default
            )}
          >
            كلية جديدة
            <IoIosAdd className="mr-2 h-4 w-4" />
          </Link>
        </div>
      </Title>
      <div className="px-4 py-2 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {collages?.map((collage, index) => {
          return (
            <Link href={`/dashboard/collages/${collage.id}`} key={index}>
              <div className="rounded-xl hover:bg-secondary transition-all h-[250px] border overflow-hidden">
                <div className="w-full h-[200px] rounded-sm ">
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

                  <div className="px-2 py-1">{collage.ArCollageData?.name}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default collagesPage;
const Breadcrumbs = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">الرئيسية</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">لوحة التحكم</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>الكليات</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
