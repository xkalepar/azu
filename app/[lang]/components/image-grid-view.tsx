import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense } from "react";
import { cn } from "@/lib/utils";
import AnimatedCard from "./animated-card";
import RemoteImage from "@/components/remote-image";
type props = {
  list: string[];
  className?: string;
};
/*
 * list of images parse them in grid view
 */
const ImageGridView = ({ list, className }: props) => {
  // console.log(4 % 2);
  return (
    <div
      className={cn(
        "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
        className
      )}
    >
      {list.map((link, index) => {
        return (
          <AnimatedCard
            key={index}
            intialX={index % 2 === 0 ? 20 : -20}
            XorY="x"
          >
            <div
              // key={index}
              className="w-full h-[200px] rounded-sm overflow-hidden"
            >
              <Suspense fallback={<Skeleton className="w-full h-full" />}>
                <RemoteImage
                  src={link}
                  alt={link}
                  loading="lazy"
                  width={1000}
                  height={1000}
                  className="object-cover w-full scale-110 transition-all h-full duration-300 hover:scale-100"
                />
              </Suspense>
            </div>
          </AnimatedCard>
        );
      })}
    </div>
  );
};

export default ImageGridView;
