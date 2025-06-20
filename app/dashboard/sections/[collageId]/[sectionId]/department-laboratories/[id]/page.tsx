import React from "react";
import { getDataById } from "../seed";
import { notFound } from "next/navigation";
import ParseData from "@/app/components/parse-data";

import Breadcrumbs, {
  FinalBreadcrumbItem,
  LinkBreadcrumbItem,
} from "../../components/breadcrumbs";
import { getSectionById } from "@/prisma/seed";
import { BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/lib/constant";
import Link from "next/link";
import { Edit2 } from "lucide-react";
import DeleteForm from "./components/delete-form";
import { Metadata } from "next";

const page = async ({
  params,
}: {
  params: { id: string; collageId: string; sectionId: string };
}) => {
  const { id, collageId, sectionId } = params;
  const section = await getSectionById(sectionId);

  const data = await getDataById(id);
  // console.log(section);
  if (!data) {
    console.log("error");
    return notFound();
  }
  return (
    <section>
      <Breadcrumbs
        collageId={collageId}
        titleOfCollage={section?.Collage?.ArCollageData?.title}
      >
        <BreadcrumbSeparator />
        <LinkBreadcrumbItem href={section?.id ?? "/"}>
          {section?.ArContent?.title}
        </LinkBreadcrumbItem>
        <BreadcrumbSeparator />
        <LinkBreadcrumbItem
          href={`/dashboard/sections/${collageId}/${sectionId}/department-laboratories`}
        >
          {"معامل القسم"}
        </LinkBreadcrumbItem>
        <BreadcrumbSeparator />
        <FinalBreadcrumbItem>{data.ArContent?.title}</FinalBreadcrumbItem>
      </Breadcrumbs>
      <div className="flex-between">
        <ParseData className="flex-1" content={data.ArContent?.body ?? ""} />
        <div className=" justify-end items-center flex-col flex gap-1 px-2">
          <Link
            href={`${id}/edit`}
            className={cn(
              buttonVariants.default,
              buttonVariants.variants.variant.ghost,
              buttonVariants.variants.size.icon
            )}
          >
            <Edit2 size={14} />
          </Link>
          <DeleteForm
            redirectTo={`/dashboard/sections/${collageId}/${sectionId}/department-laboratories`}
            id={data.id}
            arId={data.arContentId}
            enId={data.enContentId}
            title={data?.ArContent?.title}
          />
        </div>
      </div>
    </section>
  );
};

export default page;

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const data = await getDataById(id);
  if (!data) {
    return {
      title: "404 غير موجود",
    };
  }
  return {
    title: `تحكم في |${data.ArContent?.title}`,
    // description: data.ArCollageData!.content,
    // keywords: [collage.name, ...collage.categories.map((c) => c.name)],
  };
}

// export async function generateStaticParams({
//   params,
// }: {
//   params: { sectionId: string };
// }) {
//   const data = await getSectionById(params.sectionId);
//   return data?.AcademicAffairs.map((d) => ({ id: d.id }));
// }
