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
import { notFound, redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { buttonVariants } from "@/lib/constant";
import { Edit, Edit2, Trash2Icon } from "lucide-react";
import { getSession } from "@/lib/auth";
import ParseData from "@/app/components/parse-data";
import { DeleteSectionForm } from "./edit/form";

const page = async ({
  params,
}: {
  params: { collageId: string; sectionId: string };
}) => {
  const { collageId, sectionId: sectionId } = params;
  const section = await getSectionById(sectionId);
  const collage = await getCollageById(collageId);
  if (!collage) return notFound();
  const user = await getSession();
  if (!user) {
    redirect('/login')
  }
  return (
    <main>
      <div className=" flex justify-between items-center md:flex-row flex-col">
        <Breadcrumbs collageId={collageId} collageTitle={collage.ArCollageData?.title}
          sectionId={sectionId}
          sectionTitle={section?.ArContent?.title}

        />
        <div className=" justify-center items-center flex gap-1">
          <Link href={`${sectionId}/edit`}
            className={cn(
              " z-50 flex justify-center items-center",
              buttonVariants.default,
              buttonVariants.variants.variant.ghost,
              buttonVariants.variants.size.icon
            )}
          >
            <Edit size={16} />
          </Link>
          {
            user.role === "superAdmin" && <Dialog>
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
                <DeleteSectionForm
                />
              </DialogContent>
            </Dialog>
          }
        </div>


      </div>
      <p className="my-2">
        <ParseData content={collage?.ArCollageData?.content ?? "لا يوجد محتوى"} />
      </p>

    </main >
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