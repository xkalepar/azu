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
  console.log("id: " + id);
  console.log("dataId: " + dataId);
  const data = await getSpecificData({ id: dataId, });
  const currentData = data?.Pages[0];

  return (
    <section>
      <Breadcrumbs
        collageId={id}
        dataTitle={data?.Pages[0]?.title}
        collageTitle={data?.Collage[0].ArCollageData?.title}
      />
      <UpdateDataForm
        body={currentData?.body}
        collageId={id}
        enBody={currentData?.enBody}
        enTitle={currentData?.enTitle}
        pageId={currentData?.id ?? ""}
        title={currentData?.title}
      />
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
            <Link href={`/dashboard/collages/${collageId}/graduate-studies`}>الدراسات العليا</Link>
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
