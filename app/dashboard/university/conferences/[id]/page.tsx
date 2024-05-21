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
import { getConference, getConferences } from "../seed";
import DeleteMagazineForm from "../components/forms";
import { FaFilePdf } from "react-icons/fa6";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const conference = await getConference({ id: params.id });
  if (!conference) {
    return {
      title: "404 غير موجود",
    };
  }
  return {
    title: conference.arContent?.title ?? `info about ${params.id}`,
  };
}

const conferencePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const confenerence = await getConference({ id });
  if (confenerence === undefined) {
    return notFound();
  }

  return (
    <section className=" relative ">
      <div className="flex-between flex-col md:flex-row w-full">
        <Breadcrumbs title={confenerence?.arContent?.title} />
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
            dialogDescription={`هل أنت متأكد من حذف ${confenerence.arContent?.title}`}
          >
            <DeleteMagazineForm
              arId={confenerence.arContent?.id ?? ""}
              enId={confenerence.enContent?.id ?? ""}
              id={confenerence.id}
            />
          </ResponiseDialog>
          {confenerence.pdfUri !== null &&
            confenerence.pdfUri !== undefined && (
              <Link
                target={"_blank"}
                download={true}
                href={confenerence.pdfUri}
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
        <ParseData content={confenerence.arContent?.body ?? ""} />
      </div>
      {/* <ParseData  /> */}
    </section>
  );
};

export default conferencePage;
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
            <Link href={`/dashboard/university/conferences`}>المؤتمرات</Link>
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
  const conferences = await getConferences();
  return conferences.map((magazine) => ({ id: magazine.id }));
}
