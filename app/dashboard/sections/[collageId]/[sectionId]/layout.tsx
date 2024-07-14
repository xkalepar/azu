import React, { ReactNode } from "react";

import { getSectionById } from "@/prisma/seed";
import Title from "@/app/dashboard/components/title";
import NavigationTabs, {
  HomeTabLink,
  TabLink,
} from "@/app/dashboard/components/tab";

const layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { collageId: string; sectionId: string };
}) => {
  const { collageId, sectionId: id } = params;
  const section = await getSectionById(id);

  return (
    <main>
      <Title
        separator={false}
        className="text-xl font-normal pr-4 pt-4"
        title={section?.ArContent?.title ?? ""}
      >
        <div className="w-full relative">
          <NavigationTabs className="my-1">
            <HomeTabLink
              href={`/dashboard/sections/${collageId}/${id}`}
              content="عام"
            />
            <TabLink
              href={`/dashboard/sections/${collageId}/${id}/news`}
              content="الأخبار"
            />
            <TabLink
              href={`/dashboard/sections/${collageId}/${id}/gallery`}
              content="معرض الصور"
            />
            <TabLink
              href={`/dashboard/sections/${collageId}/${id}/welcome`}
              content="ترحيب"
            />
            <TabLink
              href={`/dashboard/sections/${collageId}/${id}/teachers`}
              content="أعضاء هيئة التدريس"
            />
            <TabLink
              href={`/dashboard/sections/${collageId}/${id}/department-coordinators`}
              content="منسقي القسم"
            />
            <TabLink
              href={`/dashboard/sections/${collageId}/${id}/academic-affairs`}
              content="الشؤون االكاديمية"
            />

            <TabLink
              href={`/dashboard/sections/${collageId}/${id}/department-laboratories`}
              content="معامل القسم"
            />
            <TabLink
              href={`/dashboard/sections/${collageId}/${id}/department-staffs`}
              content="كادر القسم"
            />
            <TabLink
              href={`/dashboard/sections/${collageId}/${id}/academic-guidance-handbook`}
              content="دليل االإرشاد االكاديمي"
            />
            <TabLink
              href={`/dashboard/sections/${collageId}/${id}/department-forms-and-guidelines`}
              content="نماذج وادلة القسم"
            />
            <TabLink
              href={`/dashboard/sections/${collageId}/${id}/statics`}
              content="إحصائيات"
            />
          </NavigationTabs>
        </div>
      </Title>
      {children}
    </main>
  );
};

export default layout;
