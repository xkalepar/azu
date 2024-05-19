"use client";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FaBars } from "react-icons/fa";
import Lang from "../lang";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { $Enums, Category } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import ToggleLangauge from "./toggle-lang";
const arCategories: { title: string; value: Category }[] = [
  {
    title: "العلوم الاساسية و التطبيقية",
    value: "one",
  },
  {
    title: "العلوم الانسانية",
    value: "two",
  },
  {
    title: "العلوم الطبية و الطبية المساعدة",
    value: "three",
  },
];
const enCategories: { title: string; value: Category }[] = [
  {
    title: "Basic and Applied Sciences",
    value: "one",
  },
  {
    title: "Humanities",
    value: "two",
  },
  {
    title: "Medical Sciences and Allied Health Sciences",
    value: "three",
  },
];
type Props = {
  collages: ({
    ArCollageData: {
      id: string;
      title: string;
      content: string;
    } | null;
    EnCollageData: {
      id: string;
      title: string;
      content: string;
    } | null;
  } & {
    id: string;
    logo: string;
    arabicId: string | null;
    englishId: string | null;
    category: $Enums.Category;
  })[];
  lang?: "ar" | "en";
  logo?: string;
};
type Lang = "ar" | "en";

export default function MobileNavigationBar({ collages }: Props) {
  const [open, setOpen] = useState(false);
  const { lang }: { lang: Lang } = useParams();

  function filterCollages(selectedCategory: Category) {
    const filteredCollages = collages.filter(
      (collage) => collage.category === selectedCategory
    );
    return filteredCollages;
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <FaBars />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={lang === "ar" ? "right" : "left"}
        className="min-h-screen max-h-screen py-10"
      >
        <ScrollArea
          dir={lang === "ar" ? "rtl" : "ltr"}
          className="h-full w-full relative rounded-md"
        >
          <Accordion type="multiple" className="w-full">
            <ToggleLangauge />
            <AccordionItem
              onClick={() => setOpen(!open)}
              value="item-1"
              className=" border-none bg-secondary py-3 mb-2 w-full px-2 rounded-md"
            >
              <Link href={`/${lang}`}>
                <Lang lang={lang} ar={"الرئيسية"} en={"main"} />
              </Link>
            </AccordionItem>
            <AccordionItem
              onClick={() => setOpen(!open)}
              value="item-1"
              className=" border-none bg-secondary py-3 mb-2 w-full px-2 rounded-md"
            >
              <Link href={`/${lang}/university-info`}>
                <Lang
                  lang={lang}
                  ar={"عن الجامعة"}
                  en={"About The University"}
                />
              </Link>
            </AccordionItem>
            <AccordionItem
              value="item-1"
              className=" border-none bg-secondary w-full px-2 rounded-md"
            >
              <AccordionTrigger className=" text-sm ">
                <Lang lang={lang} ar={"الكليات"} en={"collages"} />
              </AccordionTrigger>
              <AccordionContent className=" w-4/5 mx-auto my-2">
                {arCategories.map((category, i) => {
                  return (
                    <AccordionItem key={i} value={category.value}>
                      <AccordionTrigger className=" text-sm ">
                        <Lang
                          lang={lang}
                          ar={arCategories[i].title}
                          en={enCategories[i].title}
                        />
                      </AccordionTrigger>
                      <AccordionContent>
                        {filterCollages(category.value).map(
                          (collage, index) => (
                            <div onClick={() => setOpen(!open)} key={index}>
                              <Link
                                href={`${lang}/collages/${collage.id}`}
                                key={index}
                              >
                                <div className="flex text-sm group border-accent flex-start gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-white focus:bg-accent  focus:text-accent-foreground">
                                  {/* <Avatar>
                                    <AvatarImage src={collage.logo} />
                                    <AvatarFallback>Z</AvatarFallback>
                                  </Avatar> */}
                                  <Lang
                                    lang={lang}
                                    ar={
                                      <div>{collage.ArCollageData?.title}</div>
                                    }
                                    en={
                                      <div>{collage.EnCollageData?.title}</div>
                                    }
                                  />
                                </div>
                                {/* <Separator className="my-0" /> */}
                              </Link>
                            </div>
                          )
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
