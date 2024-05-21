import CardPreview from "@/app/components/card-preview";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/lib/constant";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IoIosAdd } from "react-icons/io";
import { getCenters } from "./seed";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "إدارة الجامعة | أنشطة الجامعة",
};
const page = async () => {
  const academicPrograms = await getCenters();
  return (
    <section className="relative">
      <Breadcrumbs />
      <div className="grid gap-4 px-4 py-2 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {academicPrograms.length > 0 &&
          academicPrograms?.map((n, i) => (
            <Link
              href={`university-activities/${n.id}`}
              key={i}
              className={cn(
                buttonVariants.default,
                buttonVariants.variants.variant.secondary,
                buttonVariants.variants.size.default
              )}
            >
              {n.arContent?.title}
            </Link>
          ))}
      </div>
      <Link
        href={"university-activities/new"}
        className={cn(
          "absolute left-2 top-2",
          buttonVariants.default,
          buttonVariants.variants.variant.default,
          buttonVariants.variants.size.default
        )}
      >
        جديد <IoIosAdd className="mr-2 h-4 w-4" />
      </Link>
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
          <BreadcrumbPage>أنشطة الجامعة</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
