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
  centers?: ({
    arContent?: {
      id: string;
      title: string;
      body: string;
    } | null;
    enContent?: {
      id: string;
      title: string;
      body: string;
    } | null;
  } & {
    id: string;
    arContentId: string | null;
    enContentId: string | null;
    universityId: string | null;
  })[];
  academicPrograms?: ({
    arContent?: {
      id: string;
      title: string;
      body: string;
    } | null;
    enContent?: {
      id: string;
      title: string;
      body: string;
    } | null;
  } & {
    id: string;
    arContentId: string | null;
    enContentId: string | null;
    universityId: string | null;
  })[];
  scientificResearchs?: ({
    arContent?: {
      id: string;
      title: string;
      body: string;
    } | null;
    enContent?: {
      id: string;
      title: string;
      body: string;
    } | null;
  } & {
    id: string;
    arContentId: string | null;
    enContentId: string | null;
    universityId: string | null;
  })[];
  projects?: ({
    arContent?: {
      id: string;
      title: string;
      body: string;
    } | null;
    enContent?: {
      id: string;
      title: string;
      body: string;
    } | null;
  } & {
    id: string;
    arContentId: string | null;
    enContentId: string | null;
    universityId: string | null;
  })[];
  graduates?: ({
    arContent?: {
      id: string;
      title: string;
      body: string;
    } | null;
    enContent?: {
      id: string;
      title: string;
      body: string;
    } | null;
  } & {
    id: string;
    arContentId: string | null;
    enContentId: string | null;
    universityId: string | null;
  })[];
  actvities?: ({
    arContent?: {
      id: string;
      title: string;
      body: string;
    } | null;
    enContent?: {
      id: string;
      title: string;
      body: string;
    } | null;
  } & {
    id: string;
    arContentId: string | null;
    enContentId: string | null;
    universityId: string | null;
  })[];
};
type Lang = "ar" | "en";

export default function MobileNavigationBar({
  collages,
  centers,
  academicPrograms,
  scientificResearchs,
  projects,
  graduates,
  actvities: activities,
}: Props) {
  console.log(centers);
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
        className="min-h-screen w-[90%] max-h-screen py-10"
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
              value="item-3"
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
                                href={`/${lang}/collages/${collage.id}`}
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
            {/* centers */}
            <AccordionItem
              value="item-4"
              className=" border-none bg-secondary my-2 w-full px-2 rounded-md"
            >
              <AccordionTrigger className=" text-sm ">
                <Lang
                  lang={lang}
                  ar={"الإدارات والمراكز"}
                  en={"Departments and Centers"}
                />
              </AccordionTrigger>
              <AccordionContent className=" w-4/5 mx-auto my-2">
                {centers !== undefined &&
                  centers.length > 0 &&
                  centers?.map((center, index) => (
                    <div onClick={() => setOpen(!open)} key={index}>
                      <Link href={`/${lang}/centers/${center.id}`} key={index}>
                        <div className="flex text-sm group border-accent flex-start gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-white focus:bg-accent  focus:text-accent-foreground">
                          <Lang
                            lang={lang}
                            ar={<div>{center?.arContent?.title}</div>}
                            en={<div>{center?.enContent?.title}</div>}
                          />
                        </div>
                        {/* <Separator className="my-0" /> */}
                      </Link>
                    </div>
                  ))}
              </AccordionContent>
            </AccordionItem>
            {/* academic programs */}
            <AccordionItem
              value="item-5"
              className=" border-none bg-secondary my-2 w-full px-2 rounded-md"
            >
              <AccordionTrigger className=" text-sm ">
                <Lang
                  lang={lang}
                  ar={"البرامج الأكاديمية"}
                  en={"Academic Programs"}
                />
              </AccordionTrigger>
              <AccordionContent className=" w-4/5 mx-auto my-2">
                {academicPrograms !== undefined &&
                  academicPrograms.length > 0 &&
                  academicPrograms?.map((academicProgram, index) => (
                    <div onClick={() => setOpen(!open)} key={index}>
                      <Link
                        href={`/${lang}/academic-programs/${academicProgram.id}`}
                        key={index}
                      >
                        <div className="flex text-sm group border-accent flex-start gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-white focus:bg-accent  focus:text-accent-foreground">
                          <Lang
                            lang={lang}
                            ar={<div>{academicProgram?.arContent?.title}</div>}
                            en={<div>{academicProgram?.enContent?.title}</div>}
                          />
                        </div>
                      </Link>
                    </div>
                  ))}
              </AccordionContent>
            </AccordionItem>
            {/*Scientific Research*/}
            <AccordionItem
              value="item-6"
              className=" border-none bg-secondary my-2 w-full px-2 rounded-md"
            >
              <AccordionTrigger className=" text-sm ">
                <Lang
                  lang={lang}
                  ar={"البحث العلمي"}
                  en={"Scientific Research"}
                />
              </AccordionTrigger>
              <AccordionContent className=" w-4/5 mx-auto my-2">
                <div onClick={() => setOpen(!open)}>
                  <Link href={`/${lang}/conferences/`}>
                    <div className="flex text-sm group border-accent flex-start gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-white focus:bg-accent  focus:text-accent-foreground">
                      <Lang
                        lang={lang}
                        ar={"المؤتمرات العلمية"}
                        en={"Scientific Conferences"}
                      />
                    </div>
                  </Link>
                </div>
                {scientificResearchs !== undefined &&
                  scientificResearchs.length > 0 &&
                  scientificResearchs?.map((scientificResearch, index) => (
                    <div onClick={() => setOpen(!open)} key={index}>
                      <Link
                        href={`/${lang}/scientific-researchs/${scientificResearch.id}`}
                        key={index}
                      >
                        <div className="flex text-sm group border-accent flex-start gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-white focus:bg-accent  focus:text-accent-foreground">
                          <Lang
                            lang={lang}
                            ar={
                              <div>{scientificResearch?.arContent?.title}</div>
                            }
                            en={
                              <div>{scientificResearch?.enContent?.title}</div>
                            }
                          />
                        </div>
                      </Link>
                    </div>
                  ))}
                <AccordionItem
                  value="item-x"
                  className=" border-none bg-secondary  w-full px-2 rounded-md"
                >
                  <AccordionTrigger className=" text-sm ">
                    <Lang
                      lang={lang}
                      ar={"مشاريع التخرج والأطروحات"}
                      en={"Graduation Projects and Theses"}
                    />
                  </AccordionTrigger>
                  <AccordionContent className=" w-4/5 mx-auto my-2">
                    {projects !== undefined &&
                      projects.length > 0 &&
                      projects?.map((project, index) => (
                        <div onClick={() => setOpen(!open)} key={index}>
                          <Link
                            href={`/${lang}/projects/${project.id}`}
                            key={index}
                          >
                            <div className="flex text-sm group border-accent flex-start gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-white focus:bg-accent  focus:text-accent-foreground">
                              <Lang
                                lang={lang}
                                ar={<div>{project?.arContent?.title}</div>}
                                en={<div>{project?.enContent?.title}</div>}
                              />
                            </div>
                          </Link>
                        </div>
                      ))}
                  </AccordionContent>
                </AccordionItem>
              </AccordionContent>
            </AccordionItem>

            {/* Graduates */}
            <AccordionItem
              value="item-graduates"
              className=" border-none bg-secondary my-2 w-full px-2 rounded-md"
            >
              <AccordionTrigger className=" text-sm ">
                <Lang lang={lang} ar={"الخريجون"} en={"Graduates"} />
              </AccordionTrigger>

              <AccordionContent className=" w-4/5 mx-auto my-2">
                {graduates !== undefined &&
                  graduates.length > 0 &&
                  graduates?.map((graduate, index) => (
                    <div onClick={() => setOpen(!open)} key={index}>
                      <Link
                        href={`/${lang}/graduates/${graduate.id}`}
                        key={index}
                      >
                        <div className="flex text-sm group border-accent flex-start gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-white focus:bg-accent  focus:text-accent-foreground">
                          <Lang
                            lang={lang}
                            ar={<div>{graduate?.arContent?.title}</div>}
                            en={<div>{graduate?.enContent?.title}</div>}
                          />
                        </div>
                      </Link>
                    </div>
                  ))}
              </AccordionContent>
            </AccordionItem>
            {/* أنشطة الجامعة */}
            <AccordionItem
              value="item-activity"
              className=" border-none bg-secondary my-2 w-full px-2 rounded-md"
            >
              <AccordionTrigger className=" text-sm ">
                <Lang
                  lang={lang}
                  ar={"أنشطة الجامعة"}
                  en={"university activities"}
                />
              </AccordionTrigger>

              <AccordionContent className=" w-4/5 mx-auto my-2">
                <div onClick={() => setOpen(!open)}>
                  <Link href={`/${lang}/news/`}>
                    <div className="flex text-sm group border-accent flex-start gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-white focus:bg-accent  focus:text-accent-foreground">
                      <Lang lang={lang} ar={"أخبار الجامعة"} en={"News"} />
                    </div>
                  </Link>
                </div>
                {activities !== undefined &&
                  activities.length > 0 &&
                  activities?.map((actvity, index) => (
                    <div onClick={() => setOpen(!open)} key={index}>
                      <Link
                        href={`/${lang}/university-activities/${actvity.id}`}
                        key={index}
                      >
                        <div className="flex text-sm group border-accent flex-start gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-white focus:bg-accent  focus:text-accent-foreground">
                          <Lang
                            lang={lang}
                            ar={<div>{actvity?.arContent?.title}</div>}
                            en={<div>{actvity?.enContent?.title}</div>}
                          />
                        </div>
                      </Link>
                    </div>
                  ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
