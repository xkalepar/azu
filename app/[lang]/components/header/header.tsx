"use client";
import { getDictionary } from "@/get-dictionary";
import { NavigationMenuDemo } from "./header-link";
import Logo from "./logo";
import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { buttonVariants } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { FaBars } from "react-icons/fa";
import MobileNavigationBar from "./mobile-menu-bar";

const Header = () => {
  // const dictionary = await getDictionary("ar");
  const isDesktop = useMediaQuery("(min-width: 840px)");
  return (
    <Fragment>
      <header className="flex-between px-8 py-4">
        <Logo />
        {isDesktop && <NavigationMenuDemo />}

        {/* <Link
          className={cn(
            buttonVariants.default,
            buttonVariants.variants.variant.ghost,
            "px-2 py-1"
          )}
          href={`/${dictionary.language.symbol}`}
        >
          {dictionary.language.name}
        </Link> */}
        {isDesktop && (
          <Link
            className={cn(
              buttonVariants.default,
              buttonVariants.variants.variant.ghost,
              "px-2 py-1"
            )}
            href={`/ar`}
          >
            {"العربية"}
          </Link>
        )}
        {!isDesktop && <MobileNavigationBar />}
      </header>
      <Separator />
    </Fragment>
  );
};

export default Header;
