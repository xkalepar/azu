"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  trigger: React.ReactNode;
  dialogTitle?: string;
  dialogDescription?: string;
  children?: React.ReactNode;
  className?: string;
  dir?: "rtl" | "ltr";
}
export default function ResponiseDialog({
  children,
  trigger,
  dialogDescription,
  dialogTitle,
  className,
  dir = "rtl",
}: Props) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent dir={dir} className={cn("sm:max-w-[425px]", className)}>
          <DialogHeader dir={dir}>
            {dialogTitle && <DialogTitle dir={dir}>{dialogTitle}</DialogTitle>}
            {dialogDescription && (
              <DialogDescription dir={dir}>
                {dialogDescription}
              </DialogDescription>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent dir={dir} className={cn("px-2", className)}>
        <DrawerHeader className="text-left">
          {dialogTitle && <DrawerTitle>{dialogTitle}</DrawerTitle>}
          {dialogDescription && (
            <DrawerDescription>{dialogDescription}</DrawerDescription>
          )}
        </DrawerHeader>
        {children}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>{/* <Button></Button> */}</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
