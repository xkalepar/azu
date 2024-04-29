import { i18n, type Locale } from "../../i18n-config";
import Header from "./components/header/header";
// import { Providers } from "./theme-provider";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
import { Tajawal } from "next/font/google";
const tajawal = Tajawal({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
});
import "../globals.css";
export default function Root({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html
      style={{ scrollBehavior: "smooth" }}
      suppressHydrationWarning
      lang={params.lang}
      dir={params.lang == "ar" ? "rtl" : "ltr"}
    >
      {/* <Providers> */}
      <body className={tajawal.className}>
        <Header />
        <main> {children}</main>
      </body>
      {/* </Providers> */}
    </html>
  );
}

export const metadata = {
  title: "جامعة الزيتونة",
  description: "الموقع الرسمي لجامعة الزيتونة",
};
