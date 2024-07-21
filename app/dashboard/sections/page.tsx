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
import { getCollages } from "@/prisma/seed";
import CardPreview from "../../components/card-preview";
import { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "جامعة ترهونة | لوحة التحكم | الأقسام",
};
const page = async () => {
  const collages = await getCollages();
  const user = await getSession();
  if (!user) {
    return redirect('/')
  }
  if (user.role === "admin") {
    redirect(`/dashboard/sections/${user.collageId}`)
  }
  if (user.role !== "superAdmin") {
    redirect('/login')
  } return (
    <main>
      <Title className="text-xl font-normal pr-4 pt-4" title={"الأقسام"}>
        <div className="w-full relative">
          <Breadcrumbs />
        </div>
      </Title>
      <div className="px-4 py-2 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {collages?.map((collage, index) => {
          return (
            <CardPreview
              src={collage.logo}
              key={index}
              href={`/dashboard/sections/${collage.id}`}
              alt={collage.ArCollageData?.title}
              title={`أقسام | ${collage.ArCollageData?.title}`}
            />
          );
        })}
      </div>
    </main>
  );
};

export default page;
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
          <BreadcrumbPage>الأقسام</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
