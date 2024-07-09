import { getNews } from "@/prisma/seed";
import { notFound } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { UpdateDataForm } from "../../components/forms";
import { getSpecificData } from "../../seed";

const page = async ({
  params,
}: {
  params: { id: string; dataId: string };
}) => {
  const { id, dataId } = params;
  const data = await getSpecificData({ id: dataId, });
  return (
    <section>
      <Breadcrumbs
        collageId={id}
        dataTitle={data?.Pages[0]?.title}
        collageTitle={data?.Collage[0].ArCollageData?.title}
      />
      {/* <UpdateDataForm
        body={currentNew.arContent?.body}
        collageId={collageId}
        enBody={currentNew.enContent?.body}
        enTitle={currentNew.enContent?.title}
        image={currentNew.image}
        pageId={currentNew.id}
        title={currentNew.arContent?.title}
      /> */}
    </section>
  );
};

export default page;

const Breadcrumbs = ({
  collageTitle: title,
  collageId,
  dataTitle,
}: {
  collageTitle?: string;
  collageId: string;
  dataTitle?: string;
}) => {
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
            <Link href={`/dashboard/collages/${collageId}`}>{title}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {/*  */}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/dashboard/collages/${collageId}/offices-and-administrative-departments`}>المكاتب والأقسام الإدارية</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{dataTitle}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
