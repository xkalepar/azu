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
import { getCollageById } from "@/prisma/seed";

const page = async ({
  params,
}: {
  params: { id: string; dataId: string };
}) => {
  const { id, dataId } = params;
  const data = await getSpecificData({ id: dataId, });
  const college = await getCollageById(id)

  return (
    <section>
      <Breadcrumbs
        collageId={id}
        dataTitle={data?.title}
        collageTitle={college?.ArCollageData?.title}
        dataId={data?.id}
      />
      <UpdateDataForm
        body={data?.body}
        collageId={id}
        enBody={data?.enBody}
        enTitle={data?.enTitle}
        pageId={data?.id ?? ""}
        title={data?.title}
      />
    </section>
  );
};

export default page;

const Breadcrumbs = ({
  collageTitle: title,
  collageId,
  dataTitle,
  dataId
}: {
  collageTitle?: string;
  collageId: string;
  dataTitle?: string;
  dataId?: string
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
          <BreadcrumbLink asChild>
            <Link href={`/dashboard/collages/${collageId}/graduate-studies/${dataId}`}> {dataTitle}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{"تعديل"}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
