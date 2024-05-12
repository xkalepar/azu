"use client";
import ResponsiveDialog from "@/app/[lang]/components/responsive-dialog";
import { UploadButton } from "@/app/dashboard/components/upload";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { addImageGalleryUniversity } from "@/prisma/seed";
import { Upload } from "lucide-react";
import React from "react";
interface Props {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}
const UploadImageForm = ({ images, setImages }: Props) => {
  async function uploadImage(image: string) {
    await addImageGalleryUniversity({ image });
  }
  return (
    <ResponsiveDialog
      dialogTitle="رفع صورة جديدة"
      trigger={
        <Button size={"icon"}>
          <Upload size={14} />
        </Button>
      }
    >
      <div className="h-20 flex justify-center items-center">
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // console.log(`image: ${res[0].url}`);
            // console.log(images);
            setImages([...images, res[0].url]);
            // console.log("################################");
            // console.log(images);
            toast({ title: "uploaded successfully" });
            uploadImage(res[0]!.url as string);
            // await imagesGallery({ id, list: images });
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
    </ResponsiveDialog>
  );
};

export default UploadImageForm;
