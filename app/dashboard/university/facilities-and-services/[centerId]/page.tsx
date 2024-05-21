import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/lib/constant";
import ParseData from "@/app/components/parse-data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DeleteIcon, Edit2 } from "lucide-react";
import ResponiseDialog from "@/app/[lang]/components/responsive-dialog";
import { getCenter, getCenters } from "../seed";
import DeleteCenterForm from "../new/forms";

/* export async function generateMetadata({
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
    description: collage.ArCollageData!.content,
    // keywords: [collage.name, ...collage.categories.map((c) => c.name)],
  };
} */

const newsPage = async ({ params }: { params: { centerId: string } }) => {
  const { centerId } = params;
  const center = await getCenter({ id: centerId });
  if (center === undefined) {
    return notFound();
  }

  return (
    <section className=" relative ">
      <Breadcrumbs title={center?.arContent?.title} />

      <div className="relative">
        <div
          className=" absolute z-50 gap-2 left-2 top-2 flex-between"
          dir="rtl"
        >
          <Link
            href={`${centerId}/edit`}
            className={cn(
              buttonVariants.variants.variant.ghost,
              buttonVariants.variants.size.icon,
              buttonVariants.default
            )}
          >
            <Edit2 size={16} />
          </Link>

          <ResponiseDialog
            trigger={
              <Button variant={"ghost"} size={"icon"}>
                <DeleteIcon size={16} />
              </Button>
            }
            dialogTitle=""
            dialogDescription={`هل أنت متأكد من حذف ${center.arContent?.title}`}
          >
            <DeleteCenterForm
              arId={center.arContent?.id ?? ""}
              enId={center.enContent?.id ?? ""}
              id={center.id}
            />
          </ResponiseDialog>
        </div>
        <ParseData content={center.arContent?.body ?? ""} />
      </div>
      {/* <ParseData  /> */}
    </section>
  );
};

export default newsPage;
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
            <Link href="/dashboard/university">الجامعة</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard/university/facilities-and-services">
              المرافق و الخدمات
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

export async function generateStaticParams() {
  const centers = await getCenters();
  return centers.map((center) => ({ centerId: center.id }));
}
