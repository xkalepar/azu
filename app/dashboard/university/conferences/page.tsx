import React from "react";
import { getConferences } from "./seed";
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
  title: "إدارة الجامعة | المؤتمرات",
};

const page = async () => {
  const conferences = await getConferences();
  return (
    <section className=" relative ">
      <Breadcrumbs />
      <Link
        href={"conferences/new"}
        className={cn(
          "absolute left-2 top-2",
          buttonVariants.default,
          buttonVariants.variants.variant.default,
          buttonVariants.variants.size.default
        )}
      >
        مؤتمر جديد <IoIosAdd className="mr-2 h-4 w-4" />
      </Link>
      {conferences.length < 1 ? (
        <div className="flex-center min-h-full w-full">
          <h1>لا يوجد مؤتمرات بعد</h1>
        </div>
      ) : (
        <div className=" grid md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          {conferences.map((magazine, index) => (
            <CardPreview
              key={index}
              src={magazine.logo}
              href={`conferences/${magazine.id}`}
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
          <BreadcrumbPage>المؤتمرات</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
