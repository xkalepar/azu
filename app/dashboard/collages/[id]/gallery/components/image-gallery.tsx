"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Upload } from "lucide-react";
// import ResponsiveDialog from "@/app/[lang]/components/responsive-dialog";
import UploadImageForm from "./upload";
import { Button } from "@/components/ui/button";
import { imagesGallery } from "@/prisma/seed";
import { Trash } from "lucide-react";
import RemoteImage from "@/components/remote-image";
type props = {
  list: string[];
  className?: string;
  id: string;
};
/*
 * list of images parse them in grid view
 */
const ImageGridView = ({ list, className, id }: props) => {
  const [images, setImages] = useState<string[]>(list);
  async function deleteImage(image: string) {
    console.log(images);
    const imgs = images.filter((img) => img !== image);
    console.log(imgs);
    await imagesGallery({ list: imgs, id });
    setImages(imgs);
  }
  return (
    <div className="px-2 relative">
      <div className="flex justify-end my-2">
        <UploadImageForm images={images} setImages={setImages} id={id} />
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
                <RemoteImage
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
