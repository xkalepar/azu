"use client";
import ResponsiveDialog from "@/app/[lang]/components/responsive-dialog";
import { UploadButton } from "@/app/dashboard/components/upload";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";
import React from "react";
import { addImageGallery } from "../seed";
interface Props {
  id: string;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}
const UploadImageForm = ({ id, images, setImages }: Props) => {
  async function uploadImage(image: string) {
    await addImageGallery({ id, image });
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
            setImages([...images, res[0].url]);
            toast({ title: "uploaded successfully" });
            uploadImage(res[0]!.url as string);
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
