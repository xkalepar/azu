"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function NavigationTabs({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <nav className={cn("hidden md:flex items-center", className)} dir="rtl">
      {children}
    </nav>
  );
}
interface TabLinkProps {
  href: string;
  content: string;
  className?: string;
}
export function TabLink({ href, content, className }: TabLinkProps) {
  const pathname = usePathname();
  return (
    <div className=" relative w-fit">
      <Link
        className={cn(
          className,
          "flex-center text-sm  h-12 px-4 transition-all hover:bg-secondary hover:opacity-70",
          pathname.startsWith(href)
            ? "text-primary"
            : "dark:text-white text-black "
        )}
        href={href}
      >
        {content}
      </Link>
      <div
        className={cn(
          "h-1 w-full transition-all rounded-t-lg",
          pathname.startsWith(href) && "bg-primary"
        )}
      />
    </div>
  );
}
export function HomeTabLink({ href, content, className }: TabLinkProps) {
  const pathname = usePathname();
  return (
    <div className=" relative w-fit">
      <Link
        className={cn(
          className,
          "flex-center text-sm  h-12 px-4 transition-all hover:bg-secondary hover:opacity-70",
          pathname === `${href}`
            ? "text-primary"
            : "dark:text-white text-black "
        )}
        href={href}
      >
        {content}
      </Link>
      <div
        className={cn(
          "h-1 w-full transition-all rounded-t-lg",
          pathname === `${href}` && "bg-primary"
        )}
      />
    </div>
  );
}
