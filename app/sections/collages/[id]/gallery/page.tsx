import Link from "next/link";
import ImageGridView from "./components/image-gallery";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getCollageById } from "@/prisma/seed";
import { notFound } from "next/navigation";
import { UploadButton } from "@/app/dashboard/components/upload";
import { toast } from "@/components/ui/use-toast";
const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const collage = await getCollageById(id);
  if (!collage) {
    return notFound();
  }
  return (
    <section>
      <Breadcrumbs id={id} title={collage.ArCollageData?.title} />
      <ImageGridView id={id} list={collage.gallery} />
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
          <BreadcrumbPage>معرض الصور</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
