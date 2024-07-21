import { Metadata } from "next";
import Title from "../components/title";
import NavigationTabs, { HomeTabLink, TabLink } from "../components/tab";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "جامعة ترهونة | لوحة التحكم",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();
  if (!user) {
    return redirect('/login')
  }
  if (user.role !== "superAdmin") {
    if (user.role === "admin") {
      redirect(`/dashboard/collages/${user.collageId}`);
    } else {
      redirect("/login")
    }
  }

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
              href={`/dashboard/university/teachers`}
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
            <TabLink
              href={`/dashboard/university/centers`}
              content="الإدارات و المراكز"
            />
            <TabLink
              href={`/dashboard/university/academic-programs`}
              content="البرامج الأكاديمية"
            />
            <TabLink
              href={`/dashboard/university/scientific-research`}
              content="البحث العلمي"
            />
            <TabLink
              href={`/dashboard/university/graduates`}
              content="الخريجون"
            />
            <TabLink
              href={`/dashboard/university/university-activities`}
              content="أنشطة الجامعة"
            />
            <TabLink
              href={`/dashboard/university/facilities-and-services`}
              content="المرافق و الخدمات"
            />
            <TabLink
              href={`/dashboard/university/projects`}
              content="مشاريع التخرج والأطروحات"
            />
          </NavigationTabs>
        </div>{" "}
      </Title>
      {children}
    </main>
  );
}
