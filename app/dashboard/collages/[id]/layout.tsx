import { getCollageById } from "@/prisma/seed";
import { notFound } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavigationTabs, { HomeTabLink, TabLink } from "../../components/tab";
import Title from "../../components/title";
import { Separator } from "@/components/ui/separator";

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  const collage = await getCollageById(params.id);
  if (!collage) return notFound();
  return (
    <main>
      <Title
        className="text-xl font-normal pr-4 pt-4"
        title={collage.ArCollageData!.name}
      >
        <div className="w-full relative">
          <Breadcrumbs title={collage.ArCollageData!.name} />
          <Avatar className="absolute left-2 top-2">
            <AvatarFallback>LO</AvatarFallback>
            <AvatarImage src={collage.logo} />
          </Avatar>
        </div>
      </Title>
      <NavigationTabs className="mt-5">
        <HomeTabLink href={`/dashboard/collages/${collage.id}`} content="عام" />
        <TabLink
          href={`/dashboard/collages/${collage.id}/students`}
          content="الطلبة"
        />
        <TabLink
          href={`/dashboard/collages/${collage.id}/teachers`}
          content="المعلمين"
        />
        <TabLink
          href={`/dashboard/collages/${collage.id}/news`}
          content="الأخبار"
        />
        <TabLink
          href={`/dashboard/collages/${collage.id}/blogs`}
          content="blogs"
        />
      </NavigationTabs>
      <Separator />
      {children}
    </main>
  );
};

export default layout;

const Breadcrumbs = ({ title }: { title: string }) => {
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
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
