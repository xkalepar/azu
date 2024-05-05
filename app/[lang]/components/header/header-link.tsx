"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { FaUniversity } from "react-icons/fa";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Category } from "@prisma/client";

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
    category: Category;
  })[];
};

export function NavigationMenuHeader({ collages }: Props) {
  return (
    <NavigationMenu dir="rtl">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>عن الجامعة</NavigationMenuTrigger>
        </NavigationMenuItem>

        <CollageMenu collages={collages} />

        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const categories: { title: string; value: Category }[] = [
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

const CollageMenu = ({ collages }: Props) => {
  const [showCollages, setShowCollages] = React.useState<Boolean>(false);
  const [category, setCategory] = React.useState<Category>("one");
  const filteredCollages = collages.filter(
    (collage) => collage.category === category
  );
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>الكليات</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
          {!showCollages &&
            categories.map((component, index) => (
              <div
                onClick={() => {
                  setShowCollages(!showCollages);
                  setCategory(component.value);
                }}
                key={index}
                className="block group border border-accent flex-between select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div> {component.title}</div>
                <div>
                  <ArrowLeftIcon className="transition-all group-hover:scale-110" />
                </div>
              </div>
            ))}
          {showCollages && (
            <>
              <div className="w-full flex gap-2 items-center">
                {" "}
                <Button
                  onClick={() => setShowCollages(!showCollages)}
                  variant={"ghost"}
                  size={"icon"}
                >
                  <ArrowRightIcon />
                </Button>
                <div>
                  {categories.filter((c) => c.value === category)[0].title}
                </div>
              </div>
              {/* <Separator /> */}
              {filteredCollages.map((collage, index) => (
                <NavigationMenuLink asChild key={index}>
                  <Link href={`/collages/${collage.id}`} key={index}>
                    <div className="flex group border-accent flex-start gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <Avatar>
                        <AvatarImage src={collage.logo} />
                        <AvatarFallback>Z</AvatarFallback>
                      </Avatar>
                      <div>{collage.ArCollageData?.title}</div>
                    </div>
                    <Separator className="my-0" />
                  </Link>
                </NavigationMenuLink>
              ))}
            </>
          )}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

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

/* 

  <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-2">
                <NavigationMenuLink asChild>
                  <Link
                    scroll={false}
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/university-info#overview"
                  >
                    <div className="m-auto w-fit">
                      <FaUniversity size={48} className=" text-primary" />
                    </div>
                    <div className="mb-2 mt-4 text-lg font-medium">
                      تأسيس الجامعة
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Nostrum, nam!
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>

              <ListItem
                href="/university-info#goals"
                title="رؤية و رسالة و اهداف الجامعة"
              >
                Lorem ipsum dolor sit amet...
              </ListItem>

              <ListItem
                href="/university-info#statiscs"
                title="احصائيات الجامعة"
              >
                Lorem ipsum dolor sit amet...
              </ListItem>

              <ListItem
                href="/university-info#rating"
                title="الأعتماد و التصنيف"
              >
                Lorem ipsum dolor sit amet...
              </ListItem>

              <ListItem
                href="/university-info#management"
                title="رئاسة الجامعة"
              >
                Lorem ipsum dolor sit amet...
              </ListItem>

              <ListItem href="/university-info#desk" title="مكتب الجامعة">
                Lorem ipsum dolor sit amet...
              </ListItem>

              <ListItem
                href="/university-info#desksetup"
                title="مكتب شؤون مجلس الجامعة"
              >
                Lorem ipsum dolor sit amet...
              </ListItem>

             
              <ListItem
                href="/university-info#shoon"
                title={"وكيل الجامعة للشؤون العلمية"}
              >
                Lorem ipsum dolor sit amet...
              </ListItem>

             
              <ListItem
                href="/university-info#structure"
                title="الهيكل التنظيمي للجامعة"
              >
                Lorem ipsum dolor sit amet...
              </ListItem>

             
              <ListItem href="/university-info#lists" title="سياسات و لوائح">
                Lorem ipsum dolor sit amet...
              </ListItem>
             
            </ul>
          </NavigationMenuContent>




/* 

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

*/
