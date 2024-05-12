"use client";
import { Sidebar, Menu, sidebarClasses } from "react-pro-sidebar";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaBars } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { GiRadarCrossSection } from "react-icons/gi";
import { TbLayoutCollage } from "react-icons/tb";

import { LiaUniversitySolid } from "react-icons/lia";

const HomeNavItem = ({
  pathname,
  href,
  collapsed,
  Icon,
  name,
}: {
  pathname: string;
  href: string;
  collapsed: boolean;
  Icon: React.ReactNode;
  name: string;
}) => {
  return (
    <Link
      className={`flex justify-center transition-all rounded-[0px] items-center w-full gap-1 sm:gap-2 ${
        pathname === href
          ? buttonVariants.variants.variant.secondary
          : `${buttonVariants.variants.variant.outline} border-0`
      }   ${buttonVariants.variants.size.default}`}
      href={href}
    >
      <div>{!collapsed && <span>{name}</span>}</div>
      <div>{Icon}</div>
    </Link>
  );
};
const NavItem = ({
  pathname,
  href,
  collapsed,
  Icon,
  name,
}: {
  pathname: string;
  href: string;
  collapsed: boolean;
  Icon: React.ReactNode;
  name: string;
}) => {
  return (
    <Link
      className={`flex justify-center transition-all rounded-[0px] items-center w-full gap-1 sm:gap-2 ${
        pathname === href || pathname.startsWith(`${href}/`)
          ? buttonVariants.variants.variant.secondary
          : `${buttonVariants.variants.variant.outline} border-0`
      }   ${buttonVariants.variants.size.default}`}
      href={href}
    >
      <div>{!collapsed && <span>{name}</span>}</div>
      <div>{Icon}</div>
    </Link>
  );
};

const NavigationRail = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState<boolean>(false);
  return (
    <Sidebar
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: "hsl(var(--background))",
        },
      }}
      rtl
      className="relative bg-background h-screen"
      collapsed={collapsed}
    >
      <Button
        dir="rtl"
        size={"icon"}
        variant={"ghost"}
        className={cn(
          "absolute left-2 transition-all top-2",
          collapsed && "right-1/4"
        )}
        onClick={() => setCollapsed(!collapsed)}
      >
        <FaBars />
      </Button>
      <Menu className=" mt-20 ">
        <NavItem
          pathname={pathname}
          collapsed={collapsed}
          href="/dashboard/university"
          Icon={<LiaUniversitySolid size={24} />}
          name="الجامعة"
        />
        <NavItem
          pathname={pathname}
          collapsed={collapsed}
          href="/dashboard/collages"
          Icon={<TbLayoutCollage />}
          name="الكليات"
        />
        <NavItem
          pathname={pathname}
          collapsed={collapsed}
          href="/dashboard/sections"
          Icon={<GiRadarCrossSection />}
          name="الأقسام"
        />
      </Menu>
    </Sidebar>
  );
};

export default NavigationRail;
