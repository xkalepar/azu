import React from "react";
import CardPreview from "@/app/components/card-preview";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { buttonVariants } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { IoIosAdd } from "react-icons/io";
import { getCollageById, getMagazines } from "@/prisma/seed";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const collage = await getCollageById(id);
  if (!collage) {
    return notFound();
  }
  const { magazines } = await getMagazines({ qty: 1000, linkedId: id });
  return (
    <section className=" relative">
      <Breadcrumbs id={id} title={collage.ArCollageData?.title} />
      <Link
        href={"magazines/new"}
        className={cn(
          "absolute z-50 left-2 top-2",
          buttonVariants.default,
          buttonVariants.variants.variant.default,
          buttonVariants.variants.size.default
        )}
      >
        مجلة جديدة <IoIosAdd className="mr-2 h-4 w-4" />
      </Link>
      {magazines.length < 1 ? (
        <div className="flex-center min-h-full w-full">
          <h1>لا يوجد مجلات بعد</h1>
        </div>
      ) : (
        <div className=" grid md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          {magazines.map((magazine, index) => (
            <CardPreview
              key={index}
              src={magazine.logo}
              href={`magazines/${magazine.id}`}
              title={magazine.arContent?.title}
              alt={`${magazine.arContent?.title}-${index}`}
            ></CardPreview>
          ))}
        </div>
      )}
    </section>
  );
};

export default page;

const Breadcrumbs = ({ title, id }: { title?: string; id: string }) => {
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
          <BreadcrumbLink asChild>
            <Link href="/dashboard/collages">الكليات</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/dashboard/collages/${id}`}>{title ?? ""}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>معرض الصور</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
