import ParseData from "@/app/components/parse-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUniversity } from "@/prisma/seed";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/lib/constant";
import { Edit2Icon } from "lucide-react";
const page = async () => {
  const university = await getUniversity();
  return (
    <main className=" container relative">
      <Link
        href={"/dashboard/university/edit"}
        className={cn(
          "absolute left-2 top-2",
          buttonVariants.default,
          buttonVariants.variants.variant.default,
          buttonVariants.variants.size.default
        )}
      >
        تعديل
        <Edit2Icon className="mr-2 h-4 w-4" />
      </Link>

      <Tabs defaultValue="ar" dir="rtl">
        <TabsList>
          <TabsTrigger value="ar">العربية</TabsTrigger>
          <TabsTrigger value="en">english</TabsTrigger>
        </TabsList>
        <TabsContent value="ar" dir="rtl">
          <ParseData content={university?.ArContent?.body ?? ""} dir="rtl" />
        </TabsContent>
        <TabsContent value="en" dir="ltr">
          <ParseData content={university?.EnContent?.body ?? ""} dir="rtl" />
        </TabsContent>
      </Tabs>
    </main>
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
          <BreadcrumbPage>الكليات</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
