import React from "react";
import { getMagazines } from "./seed";
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
import { Metadata } from "next";
import { buttonVariants } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { IoIosAdd } from "react-icons/io";

export const metadata: Metadata = {
  title: "إدارة الجامعة | المجلة",
};

const page = async () => {
  const magazines = await getMagazines();
  return (
    <section className=" relative ">
      <Breadcrumbs />
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
          <BreadcrumbLink asChild>
            <Link href="/dashboard/university">الجامعة</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>المجلة</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
