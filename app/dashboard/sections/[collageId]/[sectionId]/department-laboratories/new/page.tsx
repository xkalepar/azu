import React from "react";
import Breadcrumbs, {
  FinalBreadcrumbItem,
  LinkBreadcrumbItem,
} from "../../components/breadcrumbs";
import { BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getSectionById } from "@/prisma/seed";
import NewForm from "./forms";

const page = async ({
  params,
}: {
  params: { collageId: string; sectionId: string };
}) => {
  const { collageId, sectionId: id } = params;
  const section = await getSectionById(id);
  return (
    <section>
      <Breadcrumbs
        collageId={collageId}
        titleOfCollage={section?.Collage?.ArCollageData?.title}
      >
        <BreadcrumbSeparator />
        <LinkBreadcrumbItem href={`/dashboard/sections/${collageId}/${id}`}>
          {section?.ArContent?.title}
        </LinkBreadcrumbItem>
        <BreadcrumbSeparator />
        <FinalBreadcrumbItem>{"معامل القسم"}</FinalBreadcrumbItem>
      </Breadcrumbs>
      <NewForm collageId={collageId} sectionId={id} />
    </section>
  );
};

export default page;
