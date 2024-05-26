import ParseData from "@/app/components/parse-data";
import { getCollageById, getCollages } from "@/prisma/seed";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { EditCollageForm } from "./form";
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const collage = await getCollageById(params.id);

  if (!collage) {
    return {
      title: "404 غير موجود",
    };
  }
  return {
    title: `${collage.ArCollageData!.title} | ادارة`,
  };
}

export async function generateStaticParams() {
  const collages = await getCollages();
  return collages.map((collage) => ({ id: collage.id }));
}

const collagePage = async ({ params }: { params: { id: string } }) => {
  // console.log(params.id);
  const collage = await getCollageById(params.id);
  // console.log(collage);

  if (!collage) return notFound();
  return (
    <section className="px-4 py-2">
      <Breadcrumbs title={collage.ArCollageData?.title} />
      <EditCollageForm
        arId={collage?.arabicId ?? ""}
        enId={collage?.englishId ?? ""}
        body={collage.ArCollageData?.content}
        enBody={collage.EnCollageData?.content}
        title={collage.ArCollageData?.title}
        enTitle={collage.ArCollageData?.title}
        logo={collage.logo}
        // lang={lang}
        collageId={collage.id}
        selected={collage.category}
      />
    </section>
  );
};

export default collagePage;

const Breadcrumbs = ({ title }: { title?: string }) => {
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
          <BreadcrumbPage>{title ?? "..."}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
