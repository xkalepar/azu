import { i18n, type Locale } from "../../i18n-config";
import Header from "./components/header/header";
// import { Providers } from "./theme-provider";

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
import "../styles.css";
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
      <body className={cairo.className}>
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
