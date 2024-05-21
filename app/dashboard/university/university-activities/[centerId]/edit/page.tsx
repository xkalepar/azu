import { getNewsbyId } from "@/prisma/seed";
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
import { EditCenterForm } from "../../new/forms";
import { getCenter } from "../../seed";
// import { EditNewsForm } from "../../../components/forms";

const page = async ({ params }: { params: { centerId: string } }) => {
  const { centerId } = params;
  const center = await getCenter({ id: centerId });
  if (center === undefined) {
    return notFound();
  }
  return (
    <section>
      <Breadcrumbs id={centerId} title={center?.arContent?.title} />
      <EditCenterForm
        arId={center.arContent?.id ?? ""}
        enId={center.enContent?.id ?? ""}
        body={center.arContent?.body}
        centerId={centerId}
        enBody={center.enContent?.body}
        enTitle={center.enContent?.title}
        title={center.arContent?.title}
      />
    </section>
  );
};

export default page;

const Breadcrumbs = ({ title, id }: { title?: string; id: string }) => {
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
          <BreadcrumbLink asChild>
            <Link href="/dashboard/university/university-activities">
              أنشطة الجامعة
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/dashboard/university/university-activities/${id}`}>
              {title}
            </Link>
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
