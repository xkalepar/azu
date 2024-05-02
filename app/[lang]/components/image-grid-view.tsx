import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
type props = {
  list: string[];
  className?: string;
};
/*
 * list of images parse them in grid view
 */
const ImageGridView = ({ list, className }: props) => {
  return (
    <div
      className={cn(
        "grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4",
        className
      )}
    >
      {list.map((link, index) => {
        return (
          <div
            key={index}
            className="w-full h-[300px] rounded-sm overflow-hidden"
          >
            <Suspense fallback={<Skeleton className="w-full h-full" />}>
              <Image
                src={link}
                alt={link}
                loading="lazy"
                width={1000}
                height={1000}
                className="object-cover w-full scale-110 transition-all duration-300 hover:scale-100"
              />
            </Suspense>
          </div>
        );
      })}
    </div>
  );
};

export default ImageGridView;
