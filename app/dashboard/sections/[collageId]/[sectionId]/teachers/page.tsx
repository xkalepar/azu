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
import { IoIosAdd } from "react-icons/io";
import { buttonVariants } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { getUsers } from "./seed";
import { Separator } from "@/components/ui/separator";

const page = async ({ params }: { params: { collageId: string, sectionId: string } }) => {
  const { collageId, sectionId } = params;
  const collage = await getCollageById(collageId);
  const section = await getSectionById(sectionId);
  if (!collage) return notFound();
  const users = await getUsers({ role: "teacher" })
  console.log(users)

  return (
    <main className="mx-1">
      <div className="flex-between sm:flex-row flex-col gap-2">
        <Breadcrumbs collageId={collageId} collageTitle={collage.ArCollageData?.title}
          sectionId={sectionId}
          sectionTitle={section?.ArContent?.title}

        />
        <Link
          href={"teachers/new"}
          className={cn(
            "sm:w-fit w-full",
            buttonVariants.default,
            buttonVariants.variants.variant.default,
            buttonVariants.variants.size.default
          )}
        >
          معلم جديد <IoIosAdd className="mr-2 h-4 w-4" />
        </Link>

      </div>

      <div className='grid sm:grid-cols-4 gap-4 '>
        {users?.map((user, i) => {
          return <div className="py-2 rounded-md bg-secondary flex-center" key={i}>
            <div className="flex w-full flex-col">
              <p className="px-4 mx-auto">{user.fullName}</p>
              <Separator className=" my-1 h-0.5" />
              <p className="px-4 mx-auto">{user.phone}</p>
            </div>
          </div>
        })}
      </div>
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
          <BreadcrumbPage>أعضاء هيئة التدريس</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
