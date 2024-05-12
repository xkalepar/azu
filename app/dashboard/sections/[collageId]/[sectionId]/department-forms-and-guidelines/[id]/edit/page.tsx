import React from "react";
import Breadcrumbs, {
  FinalBreadcrumbItem,
  LinkBreadcrumbItem,
} from "../../../components/breadcrumbs";
import { BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getSectionById } from "@/prisma/seed";
import EditForm from "./forms";
import { getDataById } from "../../seed";

const page = async ({
  params,
}: {
  params: { collageId: string; sectionId: string; id: string };
}) => {
  const { collageId, sectionId, id } = params;
  console.log(`id server: ${id}`);
  const section = await getSectionById(sectionId);
  const data = await getDataById(id);
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
          href={`/dashboard/sections/${collageId}/${sectionId}/department-forms-and-guidelines`}
        >
          {"نماذج وادلة القسم"}
        </LinkBreadcrumbItem>
        <BreadcrumbSeparator />
        <LinkBreadcrumbItem
          href={`/dashboard/sections/${collageId}/${sectionId}/department-forms-and-guidelines/${id}`}
        >
          {data?.ArContent?.title}
        </LinkBreadcrumbItem>
        <BreadcrumbSeparator />
        <FinalBreadcrumbItem>تعديل</FinalBreadcrumbItem>
      </Breadcrumbs>
      <EditForm
        enId={data?.EnContent?.id ?? ""}
        arId={data?.ArContent?.id ?? ""}
        id={id}
        content={data?.ArContent?.body}
        enContent={data?.EnContent?.body}
        entitle={data?.EnContent?.title}
        title={data?.ArContent?.title}
        collageId={collageId}
        sectionId={sectionId}
      />
    </section>
  );
};

export default page;
