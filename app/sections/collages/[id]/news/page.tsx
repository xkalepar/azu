import CardPreview from "@/app/components/card-preview";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { getNews } from "@/prisma/seed";
import Link from "next/link";
import { IoIosAdd } from "react-icons/io";

const page = async ({ params }: { params: { id: string; query?: string } }) => {
  // console.log(params);
  const { id, query } = params;
  const news = await getNews({ collageId: id, query: query });
  return (
    <section className="relative">
      {news.length > 0 ? (
        <Breadcrumbs id={id} title={news[0].Collage?.ArCollageData?.title} />
      ) : (
        <Breadcrumbs id={id} title={"الأخبار"} />
      )}
      {/* {id} */}
      <div className="grid gap-4 px-4 py-2 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {news.length > 0 &&
          news?.map((n, i) => (
            <CardPreview
              key={i}
              src={n.image}
              alt={n.arContent?.title}
              href={`news/${n.id}`}
              title={n.arContent?.title}
            />
          ))}
      </div>
      <Link
        href={"news/new"}
        className={cn(
          "absolute left-2 top-2",
          buttonVariants.default,
          buttonVariants.variants.variant.default,
          buttonVariants.variants.size.default
        )}
      >
        خبر جديد <IoIosAdd className="mr-2 h-4 w-4" />
      </Link>
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
          <BreadcrumbPage>الأخبار</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
