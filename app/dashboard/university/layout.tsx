import { Metadata } from "next";
import Title from "../components/title";
import NavigationTabs, { HomeTabLink, TabLink } from "../components/tab";

export const metadata: Metadata = {
  title: "جامعة ترهونة | لوحة التحكم",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collage = { id: "ss" };
  return (
    <main>
      <Title className="text-xl font-normal pr-4 pt-4" title={"عن الجامعة"}>
        <div className="w-full relative">
          <NavigationTabs className="my-1">
            {/* <HomeTabLink href={`/dashboard/university`} content="عام" /> */}
            <TabLink
              href={`/dashboard/university/gallery`}
              content="معرض الصور"
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
              content="social media"
            />
            <TabLink
              href={`/dashboard/collages/${collage.id}/statics`}
              content="إحصائيات"
            />
          </NavigationTabs>
        </div>{" "}
      </Title>
      {children}
    </main>
  );
}
