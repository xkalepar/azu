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
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
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
  const [showCollages, setShowCollages] = useState<Boolean>(false);
  const [category, setCategory] = useState<Category>("one");
  const filteredCollages = collages.filter(
    (collage) => collage.category === category
  );
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
      <SheetContent className="min-h-screen max-h-fit">
        <div className="grid gap-4 py-4"></div>
        <Accordion type="multiple" className="w-full">
          <AccordionItem
            onClick={() => setOpen(!open)}
            value="item-1"
            className=" border-none bg-secondary py-3 mb-2 w-full px-2 rounded-md"
          >
            <Link href={`/`}>الرئيسية</Link>
          </AccordionItem>
          <AccordionItem
            value="item-1"
            className=" border-none bg-secondary w-full px-2 rounded-md"
          >
            <AccordionTrigger>
              <Lang lang={lang} ar={"الكليات"} en={"collages"} />
            </AccordionTrigger>
            <AccordionContent className=" w-4/5 mx-auto">
              {arCategories.map((category, i) => {
                return (
                  <AccordionItem key={i} value={category.value}>
                    <AccordionTrigger>{category.title}</AccordionTrigger>
                    <AccordionContent>
                      {filterCollages(category.value).map((collage, index) => (
                        <div key={index}>
                          <Link href={`/collages/${collage.id}`} key={index}>
                            <div className="flex group border-accent flex-start gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-white focus:bg-accent focus:text-accent-foreground">
                              <Avatar>
                                <AvatarImage src={collage.logo} />
                                <AvatarFallback>Z</AvatarFallback>
                              </Avatar>
                              <div>{collage.ArCollageData?.title}</div>
                            </div>
                            {/* <Separator className="my-0" /> */}
                          </Link>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
              <AccordionItem value="item1">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item3">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* <SheetFooter></SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
