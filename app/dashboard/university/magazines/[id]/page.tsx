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
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const magazine = await getMagazine({ id: params.id });
  if (!magazine) {
    return {
      title: "404 غير موجود",
    };
  }
  return {
    title: magazine.arContent?.title ?? `info about ${params.id}`,
  };
}

const newsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const magazine = await getMagazine({ id });
  if (magazine === undefined) {
    return notFound();
  }

  return (
    <section className=" relative ">
      <div className="flex-between flex-col md:flex-row w-full">
        <Breadcrumbs title={magazine?.arContent?.title} />
        <div className="gap-2 flex-between" dir="rtl">
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
            <Link
              target={"_blank"}
              download={true}
              href={magazine.pdfUri}
              className={cn(
                buttonVariants.variants.variant.ghost,
                buttonVariants.variants.size.icon,
                buttonVariants.default
              )}
            >
              <FaFilePdf size={16} />
            </Link>
          )}
        </div>
      </div>
      <div className="relative flex ">
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
