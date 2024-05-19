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
            <TabLink href={`/dashboard/university/news`} content="الأخبار" />
            <TabLink
              href={`/dashboard/university/news/teachers`}
              content="المعلمين"
            />

            <TabLink
              href={`/dashboard/university/links`}
              content="روابط خارجية"
            />
            <TabLink
              href={`/dashboard/university/magazines`}
              content="المجلات"
            />
            <TabLink
              href={`/dashboard/university/conferences`}
              content="المؤتمرات"
            />
          </NavigationTabs>
        </div>{" "}
      </Title>
      {children}
    </main>
  );
}
