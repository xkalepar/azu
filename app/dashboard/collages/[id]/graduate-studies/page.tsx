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
import Link from "next/link";
import { IoIosAdd } from "react-icons/io";
import { getData } from "./seed";
import ListItem from "@/app/dashboard/components/list-item";

const page = async ({ params }: { params: { id: string; query?: string } }) => {
  // console.log(params);
  const { id } = params;
  const data = await getData({ id: id })
  // console.log(data)
  // const news = await getNews({ collageId: id, query: query });
  return (
    <section className="relative">
      <Breadcrumbs id={id} title={data[0]?.ArCollageData?.title} />

      <div className="grid my-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 sm:gap-3 xl:gap-4">
        {data?.map((graduate, index) => (
          <ListItem href={`graduate-studies/${graduate.graduateStudiesId}`} key={index}>
            <div>{graduate.GraduateStudies?.Pages[0]?.title}</div>
          </ListItem>
        ))}
      </div>
      <Link
        href={"graduate-studies/new"}
        className={cn(
          "absolute left-2 top-2 z-50",
          buttonVariants.default,
          buttonVariants.variants.variant.default,
          buttonVariants.variants.size.default
        )}
      >
        جديد <IoIosAdd className="mr-2 h-4 w-4" />
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
          <BreadcrumbPage>الدراسات العليا</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
