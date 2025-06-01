import RemoteImage from "@/components/remote-image";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, cutString } from "@/lib/utils";
import Link from "next/link";
import { env } from "process";
import React, { ReactNode, Suspense } from "react";
interface Props {
  src?: string;
  alt?: string;
  title?: string;
  href?: string;
  children?: ReactNode;
  lang?: "ar" | "en";
  className?: string;
  contain?: boolean;
}
const CardPreview = ({
  src,
  title,
  href = "/",
  alt = "hello",
  children,
  lang,
  className,
  contain = false,
}: Props) => {
  return (
    <Link dir={lang === "ar" ? "rtl" : "ltr"} href={href}>
      <div
        dir={lang === "ar" ? "rtl" : "ltr"}
        className={cn(
          "rounded-xl hover:bg-secondary transition-all min-h-[250px] border relative overflow-hidden",
          className
        )}
      >
        <div className="w-full h-[200px] max-h-[200px] aspect-square rounded-sm ">
          <Suspense fallback={<Skeleton className="w-full h-full" />}>
            <RemoteImage
              src={src ?? (env.NotFoundImage as string)}
              alt={alt}
              loading="lazy"
              width={1000}
              height={1000}
              className={cn(
                "w-full h-full",
                contain ? "object-contain" : "object-cover"
              )}
            />
          </Suspense>

          <div className="px-2 py-1 flex-1">
            {" "}
            <h3
              className=" text-lg font-medium text-center"
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              {cutString(title ?? "", 80)}
            </h3>
            {children}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardPreview;
