import NavigationRail from "./components/side-bar";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Noto_Naskh_Arabic } from "next/font/google";
import { Metadata } from "next";
const notoNaskhArabic = Noto_Naskh_Arabic({
  weight: "500",
  subsets: ["arabic"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "جامعة ترهونة | لوحة التحكم",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={notoNaskhArabic.className}>
        <main className="flex flex-start gap-1 min-h-screen">
          <section className="">
            <NavigationRail />
          </section>
          <section className="flex-1">
            <main>{children}</main>
          </section>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
