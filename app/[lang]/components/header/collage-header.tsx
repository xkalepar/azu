"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Category } from "@prisma/client";
import { useParams, usePathname } from "next/navigation";
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
  //   arabicId: string | null;
  //   englishId: string | null;
  category: $Enums.Category;
};
function DesktopMenuHeaderCollage({
  logo,
  id,
  ArCollageData,
  EnCollageData,
}: CollageProps) {
  // const pathName = usePathname();
  const { lang }: { lang: "ar" | "en" } = useParams();

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
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MobileNavigationBarCollage({
  logo,
  id,
  ArCollageData,
  EnCollageData,
}: CollageProps) {
  const [open, setOpen] = useState(false);
  const { lang }: { lang: "ar" | "en" } = useParams();

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
}: CollageProps) => {
  const { lang }: { lang: "ar" | "en" } = useParams();
  return (
    <Fragment>
      <header className="flex items-center justify-between gap-2 w-full bg-background  px-8 py-4 fixed max-h-20 min-h-20 top-0 z-[150] left-0">
        <Logo href={`/${lang}/collages/${id}`} src={logo} />
        <ParseToScreenMoreThanWidth>
          <Fragment>
            <DesktopMenuHeaderCollage
              ArCollageData={ArCollageData}
              EnCollageData={EnCollageData}
              category={category}
              logo={logo}
              id={id}
            />
            <Link
              className={cn(
                buttonVariants.default,
                buttonVariants.variants.variant.ghost,
                "px-2 py-1"
              )}
              href={`${lang === "en" ? "/ar" : "/en"}`}
            >
              {lang === "en" ? "العربية" : "english"}
            </Link>
          </Fragment>
        </ParseToScreenMoreThanWidth>
        <ParseToScreenLessThanWidth>
          <MobileNavigationBarCollage
            ArCollageData={ArCollageData}
            EnCollageData={EnCollageData}
            category={category}
            logo={logo}
            id={id}
          />
        </ParseToScreenLessThanWidth>
      </header>
      <Separator />
    </Fragment>
  );
};
export default CollegeHeader;
