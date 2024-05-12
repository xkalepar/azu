// "use server";
import { getSectionById } from "@/prisma/seed";
import Breadcrumbs, {
  FinalBreadcrumbItem,
  LinkBreadcrumbItem,
} from "../components/breadcrumbs";
import ListItem from "@/app/dashboard/components/list-item";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/lib/constant";
import { IoIosAdd } from "react-icons/io";
import { BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import React from "react";
import { Metadata } from "next";
import { info } from "./constant";
// import { Info } from "../constant";
// export const info = new Info(
//   "department-staffs",
//   "كادر القسم",
//   "department staffs"
// );

export const metadata: Metadata = {
  title: "كادر القسم",
};
// export const generateMetadata = () => {
//   return { default: "Dashboard", template: "%s | My Website" };
// };

const page = async ({
  params,
}: {
  params: { collageId: string; sectionId: string };
}) => {
  const { collageId, sectionId: id } = params;
  const section = await getSectionById(id);
  return (
    <section className=" relative ">
      <div className="flex justify-between gap-1 items-start sm:flex-row flex-col">
        <Breadcrumbs
          collageId={collageId}
          // title={section?.ArContent?.title}
          titleOfCollage={section?.Collage?.ArCollageData?.title}
        >
          <BreadcrumbSeparator />
          <LinkBreadcrumbItem href={section?.id ?? "/"}>
            {section?.ArContent?.title}
          </LinkBreadcrumbItem>
          <BreadcrumbSeparator />
          <FinalBreadcrumbItem>{info.title}</FinalBreadcrumbItem>
        </Breadcrumbs>
        <Link
          href={`${info.path}/new`}
          className={cn(
            "w-[90%] mx-auto sm:mx-2 sm:w-fit",
            buttonVariants.default,
            buttonVariants.variants.variant.default,
            buttonVariants.variants.size.default
          )}
        >
          جديد
          <IoIosAdd className="mr-2 h-4 w-4" />
        </Link>
      </div>

      <div className="grid my-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 sm:gap-3 xl:gap-4">
        {section?.DepartmentStaffs?.map((department, index) => (
          <ListItem href={`${info.path}/${department.id}`} key={index}>
            {department.ArContent?.title}
          </ListItem>
        ))}
      </div>
    </section>
  );
};

export default page;
