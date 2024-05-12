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

const newsPage = async ({
  params,
}: {
  params: { id: string; newsId: string };
}) => {
  const { id, newsId } = params;
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
      {/* <div className="sm:w-1/2 lg:w-1/4 w-full mx-auto my-2 h-40 max-w-full max-h-full rounded-sm overflow-hidden">
        <Suspense fallback={<Skeleton className="w-full h-full" />}>
          <Image
            src={currentNew.image}
            alt={currentNew.arContent?.title ?? ""}
            loading="lazy"
            width={1000}
            height={1000}
            className="object-cover w-full scale-110 transition-all duration-300 hover:scale-100"
          />
        </Suspense>
      </div> */}
      <div className="relative">
        <div className=" absolute gap-2 left-2 top-2 flex-between" dir="rtl">
          <Link
            href={`/dashboard/collages/${id}/news/edit/${newsId}`}
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
            <DeleteNewsForm
              collageId={currentNew.Collage?.id ?? ""}
              id={currentNew.id}
            />
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

export async function generateStaticParams({
  params,
}: {
  params: { id: string; newsId: string };
}) {
  const news = await getNews({ id: params.id });
  return news.map((collage) => ({ id: collage.id }));
}
