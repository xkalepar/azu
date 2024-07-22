import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { CreateAdmin } from "./components/forms";
import { SelectCollage } from "./components/select-collage";
import UsersTable from "./components/table";
import Link from "next/link";
import { getUsers } from "../sections/[collageId]/[sectionId]/teachers/seed";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/lib/constant";
import { getCollages } from "./seed";

const page = async () => {
    const users = await getUsers({ role: "admin" })
    const collages = await getCollages()
    return (
        <main className=" container  relative">
            <Link href={'users/new'} className={cn("absolute left-2 top-2 z-50 flex-center rounded-md cursor-pointer", buttonVariants.variants.size.default, buttonVariants.variants.variant.default)}>
                مشرف جديد
            </Link>
            <Breadcrumb className="mt-4 mb-1">
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
                        <BreadcrumbPage>
                            المشرفين</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <UsersTable users={users} collages={collages} />
        </main>
    )
}

export default page;