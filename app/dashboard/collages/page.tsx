import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Title from "../components/title";
import Link from "next/link";
import { IoIosAdd } from "react-icons/io";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/lib/constant";
import { getCollages } from "@/prisma/seed";
import CardPreview from "../../components/card-preview";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const collagesPage = async () => {
  const collages = await getCollages();
  const user = await getSession();
  if (!user) {
    return redirect('/')
  }
  if (user.role === "admin") {
    redirect(`/dashboard/collages/${user.collageId}`)
  }
  if (user.role !== "superAdmin") {
    redirect('/login')
  }


  return (
    <main>
      <Title className="text-xl font-normal pr-4 pt-4" title={"الكليات"}>
        <div className="w-full relative">
          <Breadcrumbs />
          <Link
            href={"/dashboard/collages/new"}
            className={cn(
              "absolute left-2 top-2 z-50",
              buttonVariants.default,
              buttonVariants.variants.variant.default,
              buttonVariants.variants.size.default
            )}
          >
            كلية جديدة
            <IoIosAdd className="mr-2 h-4 w-4" />
          </Link>
        </div>
      </Title>
      <div className="px-4 py-2 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {collages?.map((collage, index) => {
          return (
            <CardPreview
              src={collage.logo}
              key={index}
              href={`/dashboard/collages/${collage.id}`}
              alt={collage.ArCollageData?.title}
              title={collage.ArCollageData?.title}
            />
          );
        })}
      </div>
    </main>
  );
};

export default collagesPage;
const Breadcrumbs = () => {
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
          <BreadcrumbPage>الكليات</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
