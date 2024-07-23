import { getSectionById } from "@/prisma/seed";
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
import { EditSectionForm } from "./form";
export async function generateMetadata({
  params,
}: {
  params: { sectionId: string };
}): Promise<Metadata> {
  const section = await getSectionById(params.sectionId);

  if (!section) {
    return {
      title: "404 غير موجود",
    };
  }
  return {
    title: `${section.ArContent!.title} | ادارة`,
  };
}

// export async function generateStaticParams({ params: { collageId } }: { params: { collageId: string } }) {
//   const sections = await getCollageByIdForSection(collageId);
//   return sections?.ScientificSection.map((section) => ({ sectionId: section.id }));
// }

const editSectionPage = async ({ params: { sectionId } }: { params: { sectionId: string } }) => {
  const section = await getSectionById(sectionId);
  // console.log(params.id);
  // console.log(collage);

  if (!section) return notFound();
  return (
    <section className="px-4 py-2">
      <Breadcrumbs
        id={section.id}
        title={section?.ArContent?.title ?? ""}
      />


      <EditSectionForm
        body={section.ArContent?.body}
        enBody={section.EnContent?.body}
        title={section.ArContent?.title}
        enTitle={section.EnContent?.title}
      />
    </section>
  );
};

export default editSectionPage;

const Breadcrumbs = ({ title, id }: { title?: string; id?: string }) => {
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
            <Link href={`/dashboard/collages/${id}`}>{title ?? "..."}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>تعديل</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
