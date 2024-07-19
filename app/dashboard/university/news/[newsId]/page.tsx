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
import DeleteNewsForm from "../new/forms";

const newsPage = async ({ params }: { params: { newsId: string } }) => {
  const { newsId } = params;
  const news = await getNewsbyId(newsId);
  if (news === undefined) {
    return notFound();
  }

  return (
    <section className=" relative ">
      <Breadcrumbs title={news?.arContent?.title} />

      <div className="relative">
        <div className=" absolute z-50 gap-2 left-2 top-2 flex-between" dir="rtl">
          <Link
            href={`${newsId}/edit`}
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
            dialogDescription={`هل أنت متأكد من حذف ${news.arContent?.title}`}
          >
            <DeleteNewsForm
              id={news.id}
            />
          </ResponiseDialog>
        </div>
        <ParseData content={news.arContent?.body ?? ""} />
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
            <Link href={`/dashboard/university/news`}>الأخبار</Link>
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
  const news = await getAllnews(true);
  return news.map((collage) => ({ newsId: collage.id }));
}
