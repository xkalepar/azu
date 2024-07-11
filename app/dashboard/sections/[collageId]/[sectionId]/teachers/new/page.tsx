import React from 'react'
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from 'next/link';
import { getCollageById, getSectionById } from '@/prisma/seed';
import { CreateTeacher } from '../components/form';
const page = async ({ params }: { params: { collageId: string, sectionId: string } }) => {
    const { collageId, sectionId } = params;
    const collage = await getCollageById(collageId);
    const section = await getSectionById(sectionId);
    return (
        <main>
            <Breadcrumbs collageId={collageId} collageTitle={collage?.ArCollageData?.title}
                sectionId={sectionId}
                sectionTitle={section?.ArContent?.title}

            />
            <CreateTeacher />

        </main>
    )
}

export default page

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
                    <BreadcrumbLink asChild>
                        <Link href={`/dashboard/sections/${collageId}/${sectionId}/teachers`}>{"أعضاء هيئة التدريس"}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>جديد</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};