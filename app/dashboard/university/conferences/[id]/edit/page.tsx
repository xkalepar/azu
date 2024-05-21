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
import { UpdateMagazineForm } from "../../components/forms";
import { getConference } from "../../seed";
// import { EditNewsForm } from "../../../components/forms";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log(params);
  const magazine = await getConference({ id: id });
  console.log(magazine);
  if (magazine === undefined) {
    return notFound();
  }
  return (
    <section>
      <Breadcrumbs id={id} title={magazine?.arContent?.title} />
      <UpdateMagazineForm
        body={magazine.arContent?.body}
        magazineId={id}
        pdf={magazine?.pdfUri ?? ""}
        enBody={magazine.enContent?.body}
        enTitle={magazine.enContent?.title}
        image={magazine.logo}
        title={magazine.arContent?.title}
        arId={magazine.arContent?.id}
        enId={magazine.enContent?.id}
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
            <Link href={`/dashboard/university/news`}>المؤتمرات</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/dashboard/university/conferences/${id}`}>
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
