import NavigationRail from "./components/side-bar";

export const metadata = {
  title: "جامعة ترهونة | لوحة التحكم",
};
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Cairo } from "next/font/google";
const cairo = Cairo({
  weight: "500",
  subsets: ["arabic"],
  display: "swap",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
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
