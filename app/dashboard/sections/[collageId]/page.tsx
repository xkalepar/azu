import ParseData from "@/app/components/parse-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getCollageById,
  getCollageByIdForSection,
  getCollages,
} from "@/prisma/seed";
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
import Title from "../../components/title";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/lib/constant";
import { IoIosAdd } from "react-icons/io";
import ListItem from "../../components/list-item";
import { revalidateTag } from "next/cache";
export async function generateMetadata({
  params,
}: {
  params: { collageId: string };
}): Promise<Metadata> {
  revalidateTag("collages");
  revalidateTag("news");
  const collage = await getCollageById(params.collageId);
  if (!collage) {
    return {
      title: "404 غير موجود",
    };
  }
  return {
    title: ` إدارة أقسام:${collage.ArCollageData!.title} `,
  };
}
const collagePage = async ({ params }: { params: { collageId: string } }) => {
  const { collageId } = params;
  const collage = await getCollageByIdForSection(collageId);
  if (!collage) return notFound();
  return (
    <section className="px-4 py-2">
      <Title className="text-xl font-normal pr-4 pt-4" title={"كل الأقسام"}>
        <div className="w-full relative">
          <Breadcrumbs title={collage.ArCollageData?.title} />
          <Link
            href={`/dashboard/sections/${params.collageId}/new`}
            className={cn(
              "absolute left-2 top-2",
              buttonVariants.default,
              buttonVariants.variants.variant.default,
              buttonVariants.variants.size.default
            )}
          >
            قسم جديد
            <IoIosAdd className="mr-2 h-4 w-4" />
          </Link>
        </div>
      </Title>
      <div className="grid my-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 sm:gap-3 xl:gap-4">
        {collage?.ScientificSection?.map((section, index) => (
          <ListItem href={`${collageId}/${section.id}`} key={index}>
            <div>{section?.ArContent?.title}</div>
          </ListItem>
        ))}
      </div>
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
            <Link href="/dashboard/sections">الأقسام</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
