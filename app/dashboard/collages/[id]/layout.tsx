import { getCollageById } from "@/prisma/seed";
import { notFound, redirect } from "next/navigation";
import React from "react";

import NavigationTabs, { HomeTabLink, TabLink } from "../../components/tab";
import Title from "../../components/title";
import { getSession } from "@/lib/auth";

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  const collage = await getCollageById(params.id);
  if (!collage) return notFound();
  const user = await getSession();
  if (!user) {
    return redirect('/login')
  }
  if (user.role !== "superAdmin" && user.role !== "admin") {
    redirect('/login')
  }
  if (user.role === "admin" && user.collageId !== params.id) {
    redirect(`/dashboard/collages/${user.collageId}`)
  }
  return (
    <main>
      <Title
        separator={false}
        avatar={collage.logo}
        className="text-xl font-normal pr-4 pt-4"
        title={collage.ArCollageData!.title}
      >
        <div className="w-full relative">
          <NavigationTabs className="my-1">
            <HomeTabLink
              href={`/dashboard/collages/${collage.id}`}
              content="عام"
            />
            <TabLink
              href={`/dashboard/collages/${collage.id}/students`}
              content="الطلبة"
            />

            <TabLink
              href={`/dashboard/collages/${collage.id}/news`}
              content="الأخبار"
            />
            <TabLink
              href={`/dashboard/collages/${collage.id}/magazines`}
              content="المجلة"
            />
            <TabLink
              href={`/dashboard/collages/${collage.id}/gallery`}
              content="معرض الصور"
            />
            <TabLink
              href={`/dashboard/collages/${collage.id}/welcome`}
              content="ترحيب"
            />

            <TabLink
              href={`/dashboard/collages/${collage.id}/offices-and-administrative-departments`}
              content="المكاتب والأقسام الإدارية"
            />
            <TabLink
              href={`/dashboard/collages/${collage.id}/links`}
              content="روابط خارجية"
            />
            <TabLink
              href={`/dashboard/sections/${collage.id}`}
              content="الأقسام العلمية"
            />
            <TabLink
              href={`/dashboard/collages/${collage.id}/graduate-studies`}
              content="الدراسات العليا"
            />
            <TabLink
              href={`/dashboard/collages/${collage.id}/forms-and-applications`}
              content="نماذج واستمارات"
            />
            <TabLink
              href={`/dashboard/collages/${collage.id}/social-media`}
              content="سوشل ميديا"
            />
            {/* <TabLink
              href={`/dashboard/collages/${collage.id}/statics`}
              content="إحصائيات"
            /> */}
          </NavigationTabs>
        </div>
      </Title>

      {/* <Breadcrumbs title={collage.ArCollageData!.title} /> */}
      {/* <Separator /> */}
      {children}
    </main>
  );
};

export default layout;
