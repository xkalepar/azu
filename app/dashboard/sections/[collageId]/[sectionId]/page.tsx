import { getCollageById, getSectionById } from "@/prisma/seed";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { buttonVariants } from "@/lib/constant";
import { Edit2 } from "lucide-react";
import EditWelcome from "./welcome/forms";

const page = async ({
  params,
}: {
  params: { collageId: string; sectionId: string };
}) => {
  const { collageId, sectionId: sectionId } = params;
  const section = await getSectionById(sectionId);
  const collage = await getCollageById(collageId);
  if (!collage) return notFound();
  return (
    <main>
      <div className=" md:flex-between">
        <Breadcrumbs collageId={collageId} collageTitle={collage.ArCollageData?.title}
          sectionId={sectionId}
          sectionTitle={section?.ArContent?.title}

        />
        <Dialog>
          <DialogTrigger
            className={cn(
              buttonVariants.variants.size.icon,
              buttonVariants.variants.variant.ghost,
              "flex-center rounded-md"
            )}
          >
            <Edit2 size={16} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>تعديل رسالة الترحيب</DialogHeader>
            <EditWelcome id={sectionId}></EditWelcome>
          </DialogContent>
        </Dialog>
      </div>
      <p className="my-2">{collage?.welcome ?? "لا يوجد محتوى"}</p>

    </main>
  );
};

export default page;
const Breadcrumbs = ({ collageTitle, collageId, sectionId, sectionTitle }: { collageTitle?: string; collageId?: string, sectionId?: string, sectionTitle?: string }) => {
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
            <Link href="/dashboard/sections">الأقسام</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/dashboard/sections/${collageId}`}>{collageTitle}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/dashboard/sections/${collageId}/${sectionId}`}>{sectionTitle}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>عام</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};