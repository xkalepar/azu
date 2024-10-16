import { i18n, type Locale } from "../../i18n-config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
import { Cairo } from "next/font/google";
const cairo = Cairo({
  weight: "500",
  subsets: ["arabic"],
  display: "swap",
});
import "../globals.css";
import { getCollages, getUniversity } from "@/prisma/seed";
import { cn } from "@/lib/utils";
import HomeFooter from "./components/footers/home-footer";
import { MainRender } from "./components/header/dynamic-header";
import Header from "./components/header/header";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
// import { getCollages } from "@/prisma/seed";
export default async function Root({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const { lang } = params;
  const collages = await getCollages();
  const univeristy = await getUniversity();
  return (
    <html
      style={{ scrollBehavior: "smooth" }}
      suppressHydrationWarning
      lang={lang}
      dir={lang == "ar" ? "rtl" : "ltr"}
    >
      <body className={cn(cairo.className, "min-h-screen relative")}>
        <main
          className={cn("mt-20 flex flex-col justify-between  min-h-screen")}
        >
          <MainRender>
            <Header
              collages={collages}
              centers={univeristy?.Centers}
              logo={univeristy?.logo}
              academicPrograms={univeristy?.AcademicProgram}
              scientificResearchs={univeristy?.ScientificResearchForUniversity}
              actvities={univeristy?.UniversityActivities}
              graduates={univeristy?.GraduatesForUniversity}
              projects={univeristy?.Projects}
            ></Header>
          </MainRender>

          <div className=" flex-1">{children}</div>

          <MainRender>
            <HomeFooter lang={lang}></HomeFooter>
          </MainRender>
        </main>
        <Toaster />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "جامعة الزيتونة",
  description: "الموقع الرسمي لجامعة الزيتونة",
  keywords: [
    "جامعة الزيتونة",
    "كلية الهندسة",
    "كلية الإعلام ",
    "كلية التجارة ",
    "كلية التقنية الطبية ",
    "كلية تقنية المعلومات ",
    "كلية الطب البيطري",
    " كلية العلوم",
    "كلية التربية البدنية ",
    "كلية الاداب ",
    "كلية القانون",
    "كلية اللغات والترجمة ",
    "كلية الشريعة",
    "كلية الطب البشري",
    "كلية التربية القصيعة",
    "كلية الاقتصاد والعلوم السياسية ",
    "كلية العلوم الاجتماعية العواتة",
    "كلية الزراعة",
    "كلية التربية / ترهونة",
    "الموقع الرسمي لجامعة الزيتونة",
  ],
};
