import CardPreview from "@/app/components/card-preview";
import {
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { buttonVariants } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { getNewsForSection } from "@/prisma/seed";
import Link from "next/link";
import { IoIosAdd } from "react-icons/io";
import Breadcrumbs from "./components/breadcrumbs";

const page = async ({
  params,
}: {
  params: { sectionId: string; query?: string; collageId: string };
}) => {
  // console.log(params);
  const { collageId: id, sectionId, query } = params;
  const news = await getNewsForSection({
    collageId: id,
    query: query,
    sectinoId: sectionId,
  });
  return (
    <section className="relative">
      <Breadcrumbs collageId={id} sectionId={sectionId}>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>الأخبار</BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumbs>
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
