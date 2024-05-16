import CardPreview from "@/app/components/card-preview";
import { getUniNews } from "@/prisma/seed";
import React from "react";
type Lang = "en" | "ar";
const page = async ({ params }: { params: { lang: Lang } }) => {
  const { lang } = params;
  const news = await getUniNews({
    ar: lang === "ar" ? true : false,
    page: 1,
    query: "",
  });
  return (
    <main className=" container ">
      <div className="grid md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {lang === "ar"
          ? news.map((item, index) => {
              return (
                <CardPreview
                  src={item.image}
                  alt={item.arContent?.title}
                  key={index}
                  href={`/news/${item.id}`}
                ></CardPreview>
              );
            })
          : news.map((item, index) => {
              return (
                <CardPreview
                  src={item.image}
                  alt={item.enContent?.title}
                  key={index}
                  href={`/news/${item.id}`}
                ></CardPreview>
              );
            })}
      </div>
    </main>
  );
};

export default page;
