import { getCollageById, getSectionById } from "@/prisma/seed";
import { notFound } from "next/navigation";
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
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/lib/constant";
import { Edit2 } from "lucide-react";
import EditWelcome from "./forms";
const page = async ({ params }: { params: { sectionId: string } }) => {
  const { sectionId: id } = params;
  const section = await getSectionById(id);
  if (!section) return notFound();

  return (
    <main className=" mx-1 ">
      <div className=" md:flex-between">
        <Breadcrumbs id={id} title={section?.ArContent?.title} />
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
            <EditWelcome id={id}></EditWelcome>
          </DialogContent>
        </Dialog>
      </div>
      <p className="my-2">{section?.welcome ?? "لا يوجد محتوى"}</p>
    </main>
  );
};

export default page;
const Breadcrumbs = ({ title, id }: { title?: string; id?: string }) => {
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
          <BreadcrumbLink asChild>
            <Link href={`/dashboard/collages/${id}`}>{title}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>رسالة الترحيب</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
