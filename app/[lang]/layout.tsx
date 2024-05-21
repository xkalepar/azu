import { i18n, type Locale } from "../../i18n-config";
import Header from "./components/header/header";
// import { Providers } from "./theme-provider";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
import { Cairo, Noto_Naskh_Arabic } from "next/font/google";
const cairo = Cairo({
  weight: "500",
  subsets: ["arabic"],
  display: "swap",
});
const notoNaskhArabic = Noto_Naskh_Arabic({
  weight: "500",
  subsets: ["arabic"],
  display: "swap",
});
import "../globals.css";
import AnimatedCard from "./components/animated-card";
import { getCollages, getUniversity } from "@/prisma/seed";
import { cn } from "@/lib/utils";
import HomeFooter from "./components/footers/home-footer";
import { SocialMedia } from "@prisma/client";
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
          <Header
            lang={lang}
            collages={collages}
            centers={univeristy?.Centers}
            logo={univeristy?.logo}
            academicPrograms={univeristy?.AcademicProgram}
            scientificResearchs={univeristy?.ScientificResearchForUniversity}
            actvities={univeristy?.UniversityActivities}
            graduates={univeristy?.GraduatesForUniversity}
            projects={univeristy?.Projects}
          ></Header>

          <div className=" flex-1">{children}</div>
          <HomeFooter
            socialMedia={univeristy?.SocialMedia as SocialMedia}
            lang={lang}
          ></HomeFooter>
        </main>
      </body>
    </html>
  );
}

export const metadata = {
  title: "جامعة الزيتونة",
  description: "الموقع الرسمي لجامعة الزيتونة",
};
