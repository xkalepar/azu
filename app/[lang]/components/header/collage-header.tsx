"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import Lang from "../lang";
import { buttonVariants } from "@/lib/constant";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FaBars } from "react-icons/fa";
import { Fragment, useState } from "react";
import { $Enums } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import Logo from "./logo";
import ToggleLangauge from "./toggle-lang";
import {
  ParseToScreenLessThanWidth,
  ParseToScreenMoreThanWidth,
} from "@/app/components/client-parser";
import DropdownMenuButton from "./drop-down-menu-item";
type CollageProps = {
  ArCollageData?: {
    id: string;
    title: string;
    content: string;
  } | null;
  EnCollageData?: {
    id: string;
    title: string;
    content: string;
  } | null;
} & {
  id: string;
  logo: string;
  category: $Enums.Category;
  graduates: { title: string, body: string, enTitle: string, enBody: string, id: string }[][] | undefined
  offices: { title: string, body: string, enTitle: string, enBody: string, id: string }[][] | undefined;
  sections: {
    title?: string | null;
    enTitle?: string | null;
    body?: string | null;
    enBody?: string | null;
    id: string;
  }[]
};
function DesktopMenuHeaderCollage({
  id,
  graduates,
  offices, sections,

}: CollageProps) {
  const { lang, collage }: { lang: "ar" | "en", collage: string } = useParams();

  return (
    <NavigationMenu
      className=" text-lg flex-1"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <NavigationMenuList className="w-full gap-2">
        <NavigationMenuItem>
          <Link href={`/${lang}`}>
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle(), " text-sm")}
            >
              <Lang lang={lang} ar={"الرئيسية"} en={"home"} />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={`/${lang}/collages/${id}/about`}>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Lang lang={lang} ar={"حول الكلية"} en={"About"} />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <DropdownMenuButton
          title={

            <Lang lang={lang} ar={"الدراسات العليا"} en={"graduate studies"} />

          }
        >
          <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            {graduates?.map((page) => (
              page.map((data, i) => (<li className="row-span-3" key={i}>
                {" "}
                <NavigationMenuLink asChild>
                  <Link
                    className={cn(
                      "text-sm w-full ",
                      buttonVariants.default,
                      buttonVariants.variants.variant.secondary,
                      buttonVariants.variants.size.default,
                      "justify-start bg-transparent"
                    )}
                    href={`/${lang}/collages/${collage}/graduate-studies/${data.id}`}
                  >
                    {" "}
                    <Lang
                      ar={data?.title}
                      en={data?.enTitle}
                      lang={lang}
                    />
                  </Link>
                </NavigationMenuLink>
              </li>))
            ))}
          </ul>
        </DropdownMenuButton>
        <DropdownMenuButton
          title={
            <Lang lang={lang} ar={"المكاتب والأقسام الإدارية"} en={"offices and administrative departments"} />
          }
        >
          <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            {offices?.map((page) => (
              page.map((data, i) => (<li className="row-span-3" key={i}>
                {" "}
                <NavigationMenuLink asChild>
                  <Link
                    className={cn(
                      "text-sm w-full ",
                      buttonVariants.default,
                      buttonVariants.variants.variant.secondary,
                      buttonVariants.variants.size.default,
                      "justify-start bg-transparent"
                    )}
                    href={`/${lang}/collages/${collage}/offices-and-administrative-departments/${data.id}`}
                  >
                    {" "}
                    <Lang
                      ar={data?.title}
                      en={data?.enTitle}
                      lang={lang}
                    />
                  </Link>
                </NavigationMenuLink>
              </li>))
            ))}
          </ul>
        </DropdownMenuButton>

        <DropdownMenuButton
          title={
            <Lang lang={lang} ar={"الأقسام العلمية"} en={"Scientific section"} />
          }
        >
          <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            {sections?.map((page, i) => (
              (<li className="row-span-3" key={i}>
                {" "}
                <NavigationMenuLink asChild>
                  <Link
                    className={cn(
                      "text-sm w-full ",
                      buttonVariants.default,
                      buttonVariants.variants.variant.secondary,
                      buttonVariants.variants.size.default,
                      "justify-start bg-transparent"
                    )}
                    href={`/${lang}/collages/${collage}/sections/${page.id}`}
                  >
                    {" "}
                    <Lang
                      ar={page?.title}
                      en={page?.enTitle}
                      lang={lang}
                    />
                  </Link>
                </NavigationMenuLink>
              </li>)
            ))}
          </ul>
        </DropdownMenuButton>

      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MobileNavigationBarCollage({
  logo,
  id,
  ArCollageData,
  EnCollageData,
  graduates,
  offices,
  sections
}: CollageProps) {
  const [open, setOpen] = useState(false);
  const { lang, collage }: { lang: "ar" | "en", collage: string } = useParams();

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
                <Lang lang={lang} ar={"الرئيسية"} en={"home"} />
              </Link>
            </AccordionItem>
            <AccordionItem
              onClick={() => setOpen(!open)}
              value="item-1"
              className=" border-none bg-secondary py-3 mb-2 w-full px-2 rounded-md"
            >
              <Link href={`/${lang}/collages/${id}/about`}>
                <Lang lang={lang} ar={"حول الكلية"} en={"About"} />
              </Link>
            </AccordionItem>



            {/* graduates */}
            <AccordionItem
              value="graduates "
              className=" border-none bg-secondary my-2 w-full px-2 rounded-md"
            >
              <AccordionTrigger className=" text-sm ">
                <Lang lang={lang} ar={"الدراسات العليا"} en={"graduate studies"} />

              </AccordionTrigger>
              <AccordionContent className=" w-4/5 mx-auto my-2">
                {graduates !== undefined &&
                  graduates.length > 0 &&
                  graduates?.map((pages) => (
                    pages.map((data, index) => (<div onClick={() => setOpen(!open)} key={index}>
                      <Link href={`/${lang}/collages/${collage}/graduate-studies/${data.id}`}>
                        <div className="flex text-sm group border-accent flex-start gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-white focus:bg-accent  focus:text-accent-foreground">
                          <Lang lang={lang} ar={data.title} en={data.enTitle} />
                        </div>
                      </Link>
                    </div>))
                  ))}
              </AccordionContent>
            </AccordionItem>


            {/* offices */}
            <AccordionItem
              value="item-The-Administrations-and-Centers"
              className=" border-none bg-secondary my-2 w-full px-2 rounded-md"
            >
              <AccordionTrigger className=" text-sm ">
                <Lang
                  lang={lang}
                  ar={"الإدارات والمراكز"}
                  en={"The Administrations and Centers"}
                />
              </AccordionTrigger>
              <AccordionContent className=" w-4/5 mx-auto my-2">
                {offices !== undefined &&
                  offices.length > 0 &&
                  offices?.map((pages) => (
                    pages.map((data, index) => (<div onClick={() => setOpen(!open)} key={index}>
                      <Link href={`/${lang}/collages/${collage}/offices-and-administrative-departments/${data.id}`}>
                        <div className="flex text-sm group border-accent flex-start gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-white focus:bg-accent  focus:text-accent-foreground">
                          <Lang lang={lang} ar={data.title} en={data.enTitle} />
                        </div>
                      </Link>
                    </div>))
                  ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

const ListItem = ({
  href,
  title,
  className,
  children,
  onClick,
}: {
  href: string;
  title: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <li onClick={onClick}>
      <NavigationMenuLink asChild>
        <Link
          scroll={false}
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
        // {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
ListItem.displayName = "ListItem";

const CollegeHeader = ({
  logo,
  id,
  ArCollageData,
  EnCollageData,
  category,
  graduates,
  offices,
  sections
}: CollageProps) => {
  const { lang }: { lang: "ar" | "en" } = useParams();
  // console.log(graduates)
  return (
    <Fragment>
      <header className="flex items-center justify-between gap-2 w-full bg-background  px-8 py-4 fixed max-h-20 min-h-20 top-0 z-[150] left-0">
        <Logo href={`/${lang}/collages/${id}`} src={logo} />
        <ParseToScreenMoreThanWidth>
          <Fragment>
            <DesktopMenuHeaderCollage
              ArCollageData={ArCollageData}
              EnCollageData={EnCollageData}
              offices={offices}
              category={category}
              logo={logo}
              id={id} graduates={graduates}
              sections={sections}
            />

            <ToggleLangauge />
          </Fragment>
        </ParseToScreenMoreThanWidth>
        <ParseToScreenLessThanWidth>
          <MobileNavigationBarCollage
            offices={offices}
            sections={sections}

            ArCollageData={ArCollageData}
            EnCollageData={EnCollageData}
            category={category}
            logo={logo}
            id={id} graduates={graduates} />
        </ParseToScreenLessThanWidth>
      </header>
      <Separator />
    </Fragment>
  );
};
export default CollegeHeader;
