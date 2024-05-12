import { buttonVariants } from "@/lib/constant";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { ReactNode } from "react";
interface Props {
  href: string;
  children: ReactNode;
  className?: string;
}
const ListItem = ({ href, children, className }: Props) => {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-md flex-col border border-secondary",
        buttonVariants.default,
        buttonVariants.variants.size.default,
        buttonVariants.variants.variant.ghost
      )}
    >
      {children}
    </Link>
  );
};

export default ListItem;
