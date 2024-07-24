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
import { getNews } from "@/prisma/seed";
import { Button } from "@/components/ui/button";
import { DeleteIcon, Edit2 } from "lucide-react";
import ResponiseDialog from "@/app/[lang]/components/responsive-dialog";
import DeleteNewsForm from "../../components/forms";


const newsPage = async ({
  params,
}: {
  params: { collageId: string; newsId: string, sectionId: string };
}) => {
  const { collageId, newsId, sectionId } = params;
  const news = await getNews({ id: newsId, includeCollage: true });
  if (news.length < 1 || news[0] === undefined) {
    return notFound();
  }
  const currentNew = news[0];

  return (
    <section className=" relative ">
      <Breadcrumbs
        collageId={currentNew!.collageId!}
        newsTitle={currentNew.arContent?.title ?? ""}
        collageTitle={currentNew.Collage?.ArCollageData?.title}
      />
      <div className="relative">
        <div className=" absolute z-50 gap-2 left-2 top-2 flex-between" dir="rtl">
          <Link
            href={`/dashboard/sections/${collageId}/${sectionId}/news/${newsId}/edit`}
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
            dialogDescription={`هل أنت متأكد من حذف ${currentNew.arContent?.title}`}
          >
            <DeleteNewsForm />
          </ResponiseDialog>
        </div>
        <ParseData content={currentNew.arContent?.body ?? ""} />
      </div>
      {/* <ParseData  /> */}
    </section>
  );
};

export default newsPage;
const Breadcrumbs = ({
  collageTitle: title,
  collageId,
  newsTitle,
}: {
  collageTitle?: string;
  collageId: string;
  newsTitle?: string;
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
            <Link href={`/dashboard/collages/${collageId}/news`}>الأخبار</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{newsTitle}</BreadcrumbPage>
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
