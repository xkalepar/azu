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
import { EditNewsForm } from "../../../components/forms";

const page = async ({
  params,
}: {
  params: { sectionId: string; newsId: string };
}) => {
  const { newsId, sectionId } = params;
  console.log(params);
  const news = await getNews({ id: newsId });
  console.log(news);
  if (news.length < 1 || !news) {
    return notFound();
  }
  const currentNew = news[0];
  return (
    <section>
      <Breadcrumbs
        id={sectionId}
        newsTitle={currentNew.arContent?.title ?? ""}
        title={currentNew.Collage?.ArCollageData?.title}
      />
      <EditNewsForm
        body={currentNew.arContent?.body}
        enBody={currentNew.enContent?.body}
        enTitle={currentNew.enContent?.title}
        image={currentNew.image}
        title={currentNew.arContent?.title}
      />
    </section>
  );
};

export default page;

const Breadcrumbs = ({
  title,
  id,
  newsTitle,
}: {
  title?: string;
  id: string;
  newsTitle: string;
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
            <Link href={`/dashboard/collages/${id}`}>{title ?? ""}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/dashboard/collages/${id}/news`}>{"الأخبار"}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{newsTitle}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
