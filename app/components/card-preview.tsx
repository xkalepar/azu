import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, Suspense } from "react";
interface Props {
  src: string;
  alt?: string;
  title?: string;
  href?: string;
  children?: ReactNode;
}
const CardPreview = ({
  src,
  title,
  href = "/",
  alt = "hello",
  children,
}: Props) => {
  return (
    <Link href={href}>
      <div className="rounded-xl hover:bg-secondary transition-all h-[250px] border overflow-hidden">
        <div className="w-full h-[200px] rounded-sm ">
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

          <div className="px-2 py-1">{title}</div>
          {children}
        </div>
      </div>
    </Link>
  );
};

export default CardPreview;
