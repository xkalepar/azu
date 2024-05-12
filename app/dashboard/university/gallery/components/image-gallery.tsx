"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import UploadImageForm from "./upload";
import { Button } from "@/components/ui/button";
import { imagesGalleryUni } from "@/prisma/seed";
import { Trash } from "lucide-react";
type props = {
  list: string[];
  className?: string;
  id: string;
};
/*
 * list of images parse them in grid view
 */
const ImageGridView = ({ list, className }: props) => {
  const [images, setImages] = useState<string[]>(list);
  async function deleteImage(image: string) {
    console.log(images);
    const imgs = images.filter((img) => img !== image);
    console.log(imgs);
    await imagesGalleryUni({ list: imgs });
    setImages(imgs);
  }
  return (
    <div className="px-2 relative">
      <div className="flex justify-end my-2">
        <UploadImageForm images={images} setImages={setImages} />
      </div>
      <div
        className={cn(
          "grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4",
          className
        )}
      >
        {images?.map((link, index) => {
          return (
            <div
              key={index}
              className="w-full relative h-[200px] rounded-sm overflow-hidden"
            >
              <Button
                size={"icon"}
                variant={"outline"}
                className=" group absolute top-0 right-0 z-50"
                onClick={() => deleteImage(link)}
              >
                <Trash
                  className=" transition-all group-hover:text-red-500"
                  size={14}
                />
              </Button>
              <Suspense fallback={<Skeleton className="w-full h-full" />}>
                <Image
                  src={link}
                  alt={link}
                  loading="lazy"
                  width={1000}
                  height={1000}
                  className="object-cover w-full h-full scale-110 transition-all duration-300 hover:scale-100"
                />
              </Suspense>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGridView;
