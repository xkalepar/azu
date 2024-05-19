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
import { getNewsbyId, getAllnews } from "@/prisma/seed";
import { Button } from "@/components/ui/button";
import { DeleteIcon, Edit2 } from "lucide-react";
import ResponiseDialog from "@/app/[lang]/components/responsive-dialog";
import DeleteNewsForm from "../../components/forms";
import { getMagazine, getMagazines } from "../seed";
import DeleteMagazineForm from "../components/forms";
import { FaFilePdf } from "react-icons/fa6";

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

const newsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const magazine = await getMagazine({ id });
  if (magazine === undefined) {
    return notFound();
  }

  return (
    <section className=" relative ">
      <Breadcrumbs title={magazine?.arContent?.title} />

      <div className="relative">
        <div
          className="absolute z-50 gap-2 left-2 top-2 flex-between"
          dir="rtl"
        >
          <Link
            href={`${id}/edit`}
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
            dialogDescription={`هل أنت متأكد من حذف ${magazine.arContent?.title}`}
          >
            <DeleteMagazineForm
              arId={magazine.arContent?.id ?? ""}
              enId={magazine.enContent?.id ?? ""}
              id={magazine.id}
            />
          </ResponiseDialog>

          {magazine.pdfUri !== null && magazine.pdfUri !== undefined && (
            <a
              href={magazine.pdfUri}
              className={cn(
                buttonVariants.variants.variant.ghost,
                buttonVariants.variants.size.icon,
                buttonVariants.default
              )}
            >
              <FaFilePdf size={16} />
            </a>
          )}
        </div>
        <ParseData content={magazine.arContent?.body ?? ""} />
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
            <Link href={`/dashboard/university/magazines`}>المجلة</Link>
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
  const magazines = await getMagazines();
  return magazines.map((magazine) => ({ id: magazine.id }));
}
