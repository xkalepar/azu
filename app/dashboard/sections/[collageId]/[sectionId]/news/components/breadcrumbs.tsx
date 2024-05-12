import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cutString } from "@/lib/utils";
import { getSectionById } from "@/prisma/seed";
import Link from "next/link";
import { ReactNode } from "react";

const Breadcrumbs = async ({
  sectionId,
  collageId,
  children,
}: {
  collageId: string;
  sectionId: string;
  children?: ReactNode;
}) => {
  const section = await getSectionById(sectionId);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">الرئيسية</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">لوحة التحكم</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {/*  */}
        <BreadcrumbItem>
          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href={`/dashboard/sectinos/`}>الأقسام</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <Link href={`/dashboard/sectinos/${collageId}`}>
                  {cutString(section?.Collage?.ArCollageData?.title ?? "")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <Link href={`/dashboard/sectinos/${collageId}/${sectionId}`}>
                  {cutString(section?.ArContent?.title ?? "")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        {children}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
