import { getSectionById } from "@/prisma/seed";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
const page = async ({
  params,
}: {
  params: { collageId: string; sectionId: string };
}) => {
  const { collageId, sectionId: id } = params;
  const section = await getSectionById(id);
  return (
    <main>
      <Breadcrumbs
        collageId={collageId}
        title={section?.ArContent?.title}
        titleOfCollage={section?.Collage?.ArCollageData?.title}
      />
    </main>
  );
};

export default page;
const Breadcrumbs = ({
  title,
  collageId,
  titleOfCollage,
}: {
  title?: string;
  collageId: string;
  titleOfCollage?: string;
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
            <Link href="/dashboard/sections">الأقسام</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/dashboard/sections/${collageId}`}>
              {titleOfCollage}
            </Link>
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
