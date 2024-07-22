import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { CreateAdmin } from "./components/forms";
import { SelectCollage } from "./components/select-collage";
import UsersTable from "./components/table";
import Link from "next/link";

const page = async () => {
    return (
        <main className=" container ">
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
            <CreateAdmin >
                <SelectCollage />
            </CreateAdmin>
            <UsersTable />
        </main>
    )
}

export default page;