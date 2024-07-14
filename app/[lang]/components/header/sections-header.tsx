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
type SectionProps = {
    logo: string;
    departments: Data;
    AcadamicAffairs: Data
    AcademicGuidanceHandbook: Data;
    DepartmentFormsAndGuidelines: Data;
    DepartmentLaboratories: Data;
};

type Data = {
    title?: string | null;
    enTitle?: string | null;
    body?: string | null;
    enBody?: string | null;
    id: string;
}[];

interface HeaderProps {
    departments: Data;
    AcadamicAffairs: Data
    AcademicGuidanceHandbook: Data;
    DepartmentFormsAndGuidelines: Data;
    DepartmentLaboratories: Data;
}
function DesktopMenuHeaderSection({ departments, AcadamicAffairs, AcademicGuidanceHandbook, DepartmentFormsAndGuidelines, DepartmentLaboratories }: HeaderProps) {
    const { lang, collage, section }: { lang: "ar" | "en", collage: string; section: string } = useParams();

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
                    <Link href={`/${lang}/collages/${collage}/sections/${section}/about`}>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <Lang lang={lang} ar={"حول القسم"} en={"About"} />
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href={`/${lang}/collages/${collage}/sections/${section}/teachers`}>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <Lang lang={lang} ar={"أعضاء هيئة التدريس"} en={"Faculty members"} />
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>



                <DropdownMenuButton
                    title={
                        <Lang lang={lang} ar={"منسقي القسم"} en={"Department coordinators"} />
                    }
                >
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        {departments?.map((page, i) => (
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
                                        href={`/${lang}/collages/${collage}/sections/${section}/department-coordinators/${page.id}`}
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


                <DropdownMenuButton
                    title={
                        <Lang lang={lang} ar={"الشؤون الأكاديمية"} en={"academic affairs"} />
                    }
                >
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        {AcadamicAffairs?.map((page, i) => (
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
                                        href={`/${lang}/collages/${collage}/sections/${section}/academic-affairs/${page.id}`}
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

                <DropdownMenuButton
                    title={
                        <Lang lang={lang} ar={"معامل القسم"} en={"department laboratories"} />
                    }
                >
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        {DepartmentLaboratories?.map((page, i) => (
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
                                        href={`/${lang}/collages/${collage}/sections/${section}/department-laboratories/${page.id}`}
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

                <DropdownMenuButton
                    title={
                        <Lang lang={lang} ar={"دليل االإرشاد االكاديمي"} en={"academic guidance handbook"} />
                    }
                >
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        {AcademicGuidanceHandbook?.map((page, i) => (
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
                                        href={`/${lang}/collages/${collage}/sections/${section}/academic-guidance-handbook/${page.id}`}
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
                <DropdownMenuButton
                    title={
                        <Lang lang={lang} ar={"نماذج وادلة القسم"} en={"department forms and guidelines"} />
                    }
                >
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        {DepartmentFormsAndGuidelines?.map((page, i) => (
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
                                        href={`/${lang}/collages/${collage}/sections/${section}/department-forms-and-guidelines/${page.id}`}
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

function MobileNavigationBarSection(
    { departments, AcadamicAffairs, AcademicGuidanceHandbook, DepartmentFormsAndGuidelines, DepartmentLaboratories }: HeaderProps) {
    const [open, setOpen] = useState(false);
    const { lang, collage, section }: { lang: "ar" | "en", collage: string; section: string } = useParams();

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
                            <Link href={`/${lang}/collages/${collage}/sections/${section}/about`}>
                                <Lang lang={lang} ar={"حول القسم"} en={"About"} />
                            </Link>
                        </AccordionItem>
                        <AccordionItem
                            onClick={() => setOpen(!open)}
                            value="item-1"
                            className=" border-none bg-secondary py-3 mb-2 w-full px-2 rounded-md"
                        >
                            <Link href={`/${lang}/collages/${collage}/sections/${section}/teachers`}>
                                <Lang lang={lang} ar={"أعضاء هيئة التدريس"} en={"Faculty members"} />
                            </Link>

                        </AccordionItem>

                        <AccordionItem
                            value="coordinators"
                            className=" border-none bg-secondary my-2 w-full px-2 rounded-md"
                        >
                            <AccordionTrigger className=" text-sm ">
                                <Lang lang={lang} ar={"منسقي القسم"} en={"Department coordinators"} />
                            </AccordionTrigger>
                            <AccordionContent className=" w-4/5 mx-auto my-2">
                                {departments !== undefined &&
                                    departments.length > 0 &&
                                    departments.map((page, index) => {
                                        return <Link key={index}

                                            href={`/${lang}/collages/${collage}/sections/${section}/department-coordinators/${page.id}`}>
                                            <div className="flex text-sm group border-accent flex-start gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-white focus:bg-accent  focus:text-accent-foreground">
                                                <Lang
                                                    ar={page?.title}
                                                    en={page?.enTitle}
                                                    lang={lang}
                                                />                                            </div>

                                        </Link>
                                    })}
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value="affairs"
                            className=" border-none bg-secondary my-2 w-full px-2 rounded-md"
                        >
                            <AccordionTrigger className=" text-sm ">
                                <Lang lang={lang} ar={"الشؤون الأكاديمية"} en={"academic affairs"} />
                            </AccordionTrigger>
                            <AccordionContent className=" w-4/5 mx-auto my-2">
                                {AcadamicAffairs !== undefined &&
                                    AcadamicAffairs.length > 0 &&
                                    AcadamicAffairs.map((page, index) => {
                                        return <Link key={index}

                                            href={`/${lang}/collages/${collage}/sections/${section}/academic-affairs/${page.id}`}
                                        >                                            <div className="flex text-sm group border-accent flex-start gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-white focus:bg-accent  focus:text-accent-foreground">
                                                <Lang
                                                    ar={page?.title}
                                                    en={page?.enTitle}
                                                    lang={lang}
                                                />                                            </div>

                                        </Link>
                                    })}
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value="laboratories"
                            className=" border-none bg-secondary my-2 w-full px-2 rounded-md"
                        >
                            <AccordionTrigger className=" text-sm ">
                                <Lang lang={lang} ar={"معامل القسم"} en={"department laboratories"} />
                            </AccordionTrigger>
                            <AccordionContent className=" w-4/5 mx-auto my-2">
                                {DepartmentLaboratories !== undefined &&
                                    DepartmentLaboratories.length > 0 &&
                                    DepartmentLaboratories.map((page, index) => {
                                        return <Link key={index}

                                            href={`/${lang}/collages/${collage}/sections/${section}/department-laboratories/${page.id}`}
                                        >                                            <div className="flex text-sm group border-accent flex-start gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-white focus:bg-accent  focus:text-accent-foreground">
                                                <Lang
                                                    ar={page?.title}
                                                    en={page?.enTitle}
                                                    lang={lang}
                                                />                                            </div>

                                        </Link>
                                    })}
                            </AccordionContent>
                        </AccordionItem>


                        <AccordionItem
                            value="handbook"
                            className=" border-none bg-secondary my-2 w-full px-2 rounded-md"
                        >
                            <AccordionTrigger className=" text-sm ">
                                <Lang lang={lang} ar={"دليل االإرشاد االكاديمي"} en={"academic guidance handbook"} />
                            </AccordionTrigger>
                            <AccordionContent className=" w-4/5 mx-auto my-2">
                                {AcademicGuidanceHandbook !== undefined &&
                                    AcademicGuidanceHandbook.length > 0 &&
                                    AcademicGuidanceHandbook.map((page, index) => {
                                        return <Link key={index}

                                            href={`/${lang}/collages/${collage}/sections/${section}/academic-guidance-handbook/${page.id}`}
                                        >                                            <div className="flex text-sm group border-accent flex-start gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-white focus:bg-accent  focus:text-accent-foreground">
                                                <Lang
                                                    ar={page?.title}
                                                    en={page?.enTitle}
                                                    lang={lang}
                                                />                                            </div>

                                        </Link>
                                    })}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem
                            value="guidelines"
                            className=" border-none bg-secondary my-2 w-full px-2 rounded-md"
                        >
                            <AccordionTrigger className=" text-sm ">
                                <Lang lang={lang} ar={"نماذج وادلة القسم"} en={"department forms and guidelines"} />
                            </AccordionTrigger>
                            <AccordionContent className=" w-4/5 mx-auto my-2">
                                {DepartmentFormsAndGuidelines !== undefined &&
                                    DepartmentFormsAndGuidelines.length > 0 &&
                                    DepartmentFormsAndGuidelines.map((page, index) => {
                                        return <Link key={index}

                                            href={`/${lang}/collages/${collage}/sections/${section}/department-forms-and-guidelines/${page.id}`}
                                        >                                            <div className="flex text-sm group border-accent flex-start gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-white focus:bg-accent  focus:text-accent-foreground">
                                                <Lang
                                                    ar={page?.title}
                                                    en={page?.enTitle}
                                                    lang={lang}
                                                />                                            </div>

                                        </Link>
                                    })}
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

const SectionHeader = ({
    logo,
    departments,
    AcadamicAffairs,
    AcademicGuidanceHandbook, DepartmentFormsAndGuidelines, DepartmentLaboratories
}: SectionProps) => {
    const { lang, collage, section }: { lang: "ar" | "en", collage: string; section: string } = useParams();
    return (
        <Fragment>
            <header className="flex items-center justify-between gap-2 w-full bg-background  px-8 py-4 fixed max-h-20 min-h-20 top-0 z-[150] left-0">
                <Logo href={`/${lang}/collages/${collage}/sections/${section}`} src={logo} />
                <ParseToScreenMoreThanWidth width="1401px">
                    <Fragment>
                        <DesktopMenuHeaderSection
                            departments={departments}
                            AcadamicAffairs={AcadamicAffairs}
                            AcademicGuidanceHandbook={AcademicGuidanceHandbook}
                            DepartmentFormsAndGuidelines={DepartmentFormsAndGuidelines}
                            DepartmentLaboratories={DepartmentLaboratories}
                        />
                        <ToggleLangauge />
                    </Fragment>
                </ParseToScreenMoreThanWidth>
                <ParseToScreenLessThanWidth width="1400px">

                    <MobileNavigationBarSection
                        departments={departments}
                        AcadamicAffairs={AcadamicAffairs}
                        AcademicGuidanceHandbook={AcademicGuidanceHandbook}
                        DepartmentFormsAndGuidelines={DepartmentFormsAndGuidelines}
                        DepartmentLaboratories={DepartmentLaboratories}
                    />

                </ParseToScreenLessThanWidth>
            </header>
            <Separator />
        </Fragment>
    );
};
export default SectionHeader;
