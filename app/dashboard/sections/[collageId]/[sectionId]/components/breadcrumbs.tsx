import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cutString } from "@/lib/utils";
import { ReactNode } from "react";
interface Props {
  collageId: string;
  titleOfCollage?: string;
  existedCollage?: boolean;
  children: ReactNode;
}
const Breadcrumbs = ({
  collageId,
  titleOfCollage,
  existedCollage = true,
  children,
}: Props) => {
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
        <BreadcrumbItem>
          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem></DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard/sections">الأقسام</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {existedCollage ? (
                  <Link href={`/dashboard/sections/${collageId}`}>
                    {cutString(titleOfCollage ?? "")}
                  </Link>
                ) : (
                  <Link href={`/dashboard/sections/${collageId}`}>
                    {"كلية ..."}
                  </Link>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        {children}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export const FinalBreadcrumbItem = ({ children }: { children: ReactNode }) => {
  return (
    <BreadcrumbItem>
      <BreadcrumbPage>{children}</BreadcrumbPage>
    </BreadcrumbItem>
  );
};
export const LinkBreadcrumbItem = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => {
  return (
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link href={href}>{children}</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
  );
};

export default Breadcrumbs;
