import ParseData from "@/app/components/parse-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
export async function generateMetadata({
  params,
}: {
  params: { collage: string };
}): Promise<Metadata> {
  const collage = await getCollageById(params.collage);
  if (!collage) {
    return {
      title: "404 غير موجود",
    };
  }
  return {
    title: collage.ArCollageData!.title,
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
      <Tabs defaultValue="ar" dir="rtl">
        <TabsList>
          <TabsTrigger value="ar">العربية</TabsTrigger>
          <TabsTrigger value="en">english</TabsTrigger>
        </TabsList>
        <TabsContent value="ar">
          <ParseData dir="rtl" content={collage.ArCollageData!.content} />
        </TabsContent>
        <TabsContent value="en">
          <ParseData dir="ltr" content={collage.EnCollageData!.content} />
        </TabsContent>
      </Tabs>
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
