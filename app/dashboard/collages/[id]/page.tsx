import ParseData from "@/app/components/parse-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCollageById, getCollages } from "@/prisma/seed";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2Icon } from "lucide-react";
import { buttonVariants } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { Edit } from "lucide-react";
import { DeleteCollageForm } from "../new/forms";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const collage = await getCollageById(params.id);

  if (!collage) {
    return {
      title: "404 غير موجود",
    };
  }
  return {
    title: `${collage.ArCollageData!.title} | ادارة`,
  };
}

export async function generateStaticParams() {
  const collages = await getCollages();
  return collages.map((collage) => ({ id: collage.id }));
}

const collagePage = async ({ params }: { params: { id: string } }) => {
  // console.log(params.id);
  const collage = await getCollageById(params.id);
  // console.log(collage);

  if (!collage) return notFound();
  return (
    <main className="px-4 py-2">
      <div className="flex-col  md:flex-row flex justify-start items-start md:justify-between md:items-center">
        <Breadcrumbs title={collage.ArCollageData?.title} />
        <div className=" flex items-center gap-1">
          <Link
            href={`/dashboard/collages/${collage.id}/edit`}
            className={cn(
              " z-50 flex justify-center items-center",
              buttonVariants.default,
              buttonVariants.variants.variant.ghost,
              buttonVariants.variants.size.icon
            )}
          >
            <Edit size={16} />
          </Link>
          <Dialog>
            <DialogTrigger
              className={cn(
                " z-50 flex justify-center items-center",
                buttonVariants.default,
                buttonVariants.variants.variant.ghost,
                buttonVariants.variants.size.icon
              )}
            >
              <Trash2Icon size={16}></Trash2Icon>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                هل انت متاكد من حذف {collage.ArCollageData?.title}
              </DialogHeader>
              <DeleteCollageForm
                arId={collage?.arabicId ?? ""}
                enId={collage?.englishId ?? ""}
                collageId={collage.id}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Tabs defaultValue="ar" dir="rtl">
        <TabsList>
          <TabsTrigger value="ar">العربية</TabsTrigger>
          <TabsTrigger value="en">english</TabsTrigger>
        </TabsList>
        <TabsContent value="ar">
          <ParseData dir="rtl" content={collage.ArCollageData!.content} />
        </TabsContent>
        <TabsContent value="en">
          <ParseData dir="ltr" content={collage.EnCollageData!.content} />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default collagePage;

const Breadcrumbs = ({ title }: { title?: string }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">الرئيسية</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">لوحة التحكم</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard/collages">الكليات</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{title ?? "..."}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
