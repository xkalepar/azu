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
import { Button } from "@/components/ui/button";
import { DeleteIcon, Edit2 } from "lucide-react";
import ResponiseDialog from "@/app/[lang]/components/responsive-dialog";
import { getSpecificData } from "../seed";
import { DeleteDataForm } from "../components/forms";

const newsPage = async ({
  params,
}: {
  params: { id: string; dataId: string };
}) => {
  const { id, dataId } = params;
  const data = await getSpecificData({ id: dataId, });
  return (
    <section className=" relative ">
      <Breadcrumbs
        collageId={id}
        dataTitle={data?.Pages[0]?.title}
        collageTitle={data?.Collage[0].ArCollageData?.title}
      />

      <div className="relative">
        <div className=" absolute z-[10000] gap-2 left-2 top-2 flex-between" dir="rtl">
          <Link
            href={`/dashboard/collages/${id}/offices-and-administrative-departments/${dataId}/edit`}
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
            dialogDescription={`هل أنت متأكد من حذف ${data?.Pages[0]?.title}`}
          >
            <DeleteDataForm
              collageId={id}
              id={dataId}
              pageId={data?.Pages[0].id ?? ""}
            />
          </ResponiseDialog>
        </div>
        <ParseData content={data?.Pages[0]?.body ?? ""} />
      </div>
      {/* <ParseData  /> */}
    </section>
  );
};

export default newsPage;
const Breadcrumbs = ({
  collageTitle: title,
  collageId,
  dataTitle,
}: {
  collageTitle?: string;
  collageId: string;
  dataTitle?: string;
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
            <Link href="/dashboard/collages">الكليات</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/dashboard/collages/${collageId}`}>{title}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {/*  */}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/dashboard/collages/${collageId}/offices-and-administrative-departments`}>المكاتب والأقسام الإدارية</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{dataTitle}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

// export async function generateStaticParams({
//   params,
// }: {
//   params: { id: string; newsId: string };
// }) {
//   const news = await getNews({ id: params.id });
//   return news.map((collage) => ({ id: collage.id }));
// }
