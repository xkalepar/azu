import { Locale } from "../../i18n-config";
import NewsBar from "./components/news/newsBar";
import ImageGridView from "./components/image-grid-view";
import { getCollages, getUniNews, getUniversity } from "@/prisma/seed";
import Header from "./components/header/header";
import Image from "next/image";
import { getDictionary } from "@/get-dictionary";
import { cn, cutString } from "@/lib/utils";
import { FaUniversity } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import AnimatedCard from "./components/animated-card";
import Statiscs from "./components/statiscs";
import CardPreview from "../components/card-preview";

const list = [
  "https://plus.unsplash.com/premium_photo-1675629118284-c9eb039df8cd?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714041691623-35d1b8c5e28b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1675629118284-c9eb039df8cd?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1705899853374-d91c048b81d2?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714287687895-e90e18587188?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714151676676-7471bc1a0794?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714138068544-b43633c10649?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714138107718-baa87d3ea624?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714224806668-9d8dc105f71e?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1675629118284-c9eb039df8cd?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714041691623-35d1b8c5e28b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1675629118284-c9eb039df8cd?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1705899853374-d91c048b81d2?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714287687895-e90e18587188?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714151676676-7471bc1a0794?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714138068544-b43633c10649?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714138107718-baa87d3ea624?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714224806668-9d8dc105f71e?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default async function home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  const collages = await getCollages();
  const univeristy = await getUniversity();
  const news = await getUniNews({ ar: lang === "ar", take: 6 });
  return (
    <div>
      <AnimatedCard intialX={60} XorY="x">
        <Header lang={lang} collages={collages} logo={univeristy?.logo} />
      </AnimatedCard>
      <div className="bg-[url('https://www.azu.edu.ly/assets/img/hero-bg.jpeg')] bg-center bg-cover h-screen min-h-screen relative -z-[1] container text-center">
        <div className="z-10 min-w-full min-h-full bg-black  absolute top-0 left-0 opacity-40"></div>
        <div className="h-full w-full flex relative z-50 justify-center flex-col items-center">
          <AnimatedCard className="" XorY="x">
            <div
              className={cn(
                "font-bold   text-white flex justify-center  gap-5 items-center"
              )}
            >
              <FaUniversity size={128} className="hidden md:block" />
              <div className="flex flex-col justify-between gap-1">
                <div className=" relative z-[100]">
                  <Input
                    type="text"
                    className=" bg-secondary z-50 text-primary hidden md:block"
                  />
                  <Button
                    size={"icon"}
                    className="hidden md:flex absolute left-0 top-0"
                  >
                    <SearchIcon />
                  </Button>
                </div>
                <h1 className="text-3xl my-2">
                  {dictionary["pages"]["univeristy"]["overview"]["title"]}
                </h1>
              </div>
            </div>
            <p className="text-white">
              {dictionary["pages"]["univeristy"]["overview"]["bio"]}
            </p>
          </AnimatedCard>
        </div>
      </div>
      <main className=" container ">
        <AnimatedCard XorY="x" intialX={100}>
          <NewsBar
            className="py-8"
            content={dictionary.pages["univeristy"]["overview"]["info"]}
          />
        </AnimatedCard>
        {univeristy !== undefined &&
        univeristy !== null &&
        univeristy.gallery.length > 0 ? (
          <ImageGridView list={univeristy.gallery} />
        ) : (
          <div>لا يوجد صور بعد</div>
        )}
        <h2 className="text-xl text-center my-2 font-bold">
          {dictionary.pages.univeristy["overview"]["statistics"]}
        </h2>
        <Statiscs />
        <h3 className="text-xl text-center my-2 font-bold">اخر الأخبار</h3>
        {news.length === 0 && <div>لا يوجد أخبار</div>}
        {news.map((item, i) => (
          <CardPreview
            key={i}
            title={item.arContent?.title}
            src={item.image}
            href={`/news/${item.id}`}
          >
            <div className="w-full">
              {lang === "ar"
                ? cutString(item.arContent?.title ?? "", 200, "المزيد")
                : cutString(item.enContent?.title ?? "", 200, "more")}
            </div>
          </CardPreview>
        ))}
      </main>
    </div>
  );
}

/* 

  <div className="w-full mt-20 h-[90vh] rounded-sm overflow-hidden">
        <Image
          src={"https://www.azu.edu.ly/assets/img/hero-bg.jpeg"}
          alt={"https://www.azu.edu.ly/assets/img/hero-bg.jpeg"}
          loading="lazy"
          width={1000}
          height={1000}
          className="object-cover z-20 select-none w-full h-full scale-110 transition-all duration-300 hover:scale-100"
        />
        <div className="object-cover z-30 w-full h-full bg-black relative opacity-10" />
        <div className="absolute transform-center top-1/2 text-secondary mx-auto w-full transition-all z-50 text-center  ">
          <h1
            className={cn(
              "font-bold text-3xl text-primary flex  justify-center   gap-5 items-end  stroke-2 stroke-ring"
            )}
          >
            <FaUniversity size={128} className="hidden md:block" />
            <div className="flex flex-col justify-between gap-1">
              <div className="relative">
                <Input
                  type="text"
                  className=" bg-secondary text-primary hidden md:block"
                />
                <Button
                  size={"icon"}
                  className="hidden md:flex absolute left-0 top-0"
                >
                  <SearchIcon />
                </Button>
              </div>
              {dictionary["pages"]["univeristy"]["overview"]["title"]}
              {/* {dictionary?.pages["univeristy"]["overview"]["title"]} 
            </div>
          </h1>
          {dictionary["pages"]["univeristy"]["overview"]["bio"]}

          {/* <h1>{dictionary["pages"]["univeristy"]["overview"]["title"]}</h1> 
        </div>
      </div>*/
