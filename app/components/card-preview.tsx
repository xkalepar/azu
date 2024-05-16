import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, Suspense } from "react";
interface Props {
  src: string;
  alt?: string;
  title?: string;
  href?: string;
  children?: ReactNode;
  lang?: "ar" | "en";
  className?: string;
}
const CardPreview = ({
  src,
  title,
  href = "/",
  alt = "hello",
  children,
  lang,
  className,
}: Props) => {
  return (
    <Link dir={lang === "ar" ? "rtl" : "ltr"} href={href}>
      <div
        dir={lang === "ar" ? "rtl" : "ltr"}
        className={cn(
          "rounded-xl hover:bg-secondary transition-all min-h-[250px] border overflow-hidden",
          className
        )}
      >
        <div className="w-full h-[200px] max-h-[200px] rounded-sm ">
          <Suspense fallback={<Skeleton className="w-full h-full" />}>
            <Image
              src={src}
              alt={alt}
              loading="lazy"
              width={1000}
              height={1000}
              className="object-cover w-full h-full"
            />
          </Suspense>

          <div className="px-2 py-1 flex-1">
            {" "}
            <div dir={lang === "ar" ? "rtl" : "ltr"}>{title}</div>
            {children}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardPreview;
