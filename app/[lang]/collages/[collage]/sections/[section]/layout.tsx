import { getCollageById, getCollageByIdForSection, getSectionById } from "@/prisma/seed";
import { notFound } from "next/navigation";
import React, { ReactNode } from "react";
import { Metadata } from "next";
import { getData as getGraduates } from "@/app/dashboard/collages/[id]/graduate-studies/seed";
import { getData as getOffices } from "@/app/dashboard/collages/[id]/offices-and-administrative-departments/seed";
import { SectionRender } from "@/app/[lang]/components/header/dynamic-header";
import SectionHeader from "@/app/[lang]/components/header/sections-header";
export async function generateMetadata({
    params,
}: {
    params: { collage: string; lang: "ar" | "en" };
}): Promise<Metadata> {
    const collage = await getCollageById(params.collage);
    if (!collage) {
        return {
            title: "404 غير موجود",
        };
    }
    return {
        title: collage.ArCollageData!.title,
        description: collage.ArCollageData!.content,
        icons: collage.logo,
    };
}
const layout = async ({
    children,
    params,
}: {
    children: ReactNode;
    params: { section: string; lang: "ar" | "en" };
}) => {
    const { section: id } = params;
    const section = await getSectionById(id)
    // const departemnts = await get({ id })

    if (!section) return notFound();
    const formattedDepartment = section.departmentCoordinators.map((department) => {
        return {
            title: department.ArContent?.title,
            enTitle: department.EnContent?.title,
            body: department.ArContent?.body,
            enBody: department.EnContent?.body,
            id: department.id
        }
    });
    const formattedAcadamicAffairs = section.AcademicAffairs.map((data) => {
        return {
            title: data.ArContent?.title,
            enTitle: data.EnContent?.title,
            body: data.ArContent?.body,
            enBody: data.EnContent?.body,
            id: data.id
        }
    });
    const formattedAcademicGuidanceHandbook = section.AcademicGuidanceHandbook.map((data) => {
        return {
            title: data.ArContent?.title,
            enTitle: data.EnContent?.title,
            body: data.ArContent?.body,
            enBody: data.EnContent?.body,
            id: data.id
        }
    });
    const formattedDepartmentFormsAndGuidelines = section.DepartmentFormsAndGuidelines.map((data) => {
        return {
            title: data.ArContent?.title,
            enTitle: data.EnContent?.title,
            body: data.ArContent?.body,
            enBody: data.EnContent?.body,
            id: data.id
        }
    });
    const formattedDepartmentLaboratories = section.DepartmentLaboratories.map((data) => {
        return {
            title: data.ArContent?.title,
            enTitle: data.EnContent?.title,
            body: data.ArContent?.body,
            enBody: data.EnContent?.body,
            id: data.id
        }
    });

    return (
        <main className="">
            <SectionRender>
                <SectionHeader
                    departments={formattedDepartment}
                    logo={section.Collage?.logo ?? ""}
                    AcadamicAffairs={formattedAcadamicAffairs}
                    DepartmentLaboratories={formattedDepartmentLaboratories}
                    AcademicGuidanceHandbook={formattedAcademicGuidanceHandbook}
                    DepartmentFormsAndGuidelines={formattedDepartmentFormsAndGuidelines}

                />

            </SectionRender>

            {children}
        </main>
    );
};

export default layout;
