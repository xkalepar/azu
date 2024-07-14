import Lang from '@/app/[lang]/components/lang';
import ParseData from '@/app/components/parse-data';
import { getDataById } from '@/app/dashboard/sections/[collageId]/[sectionId]/department-coordinators/seed';
import { getSectionById } from '@/prisma/seed';
import { Metadata } from 'next';
import React from 'react'

export async function generateMetadata({
    params: { department, lang }
}: {
    params: { section: string; lang: "ar" | "en"; department: string };
}): Promise<Metadata> {
    const departemnts = await getDataById(department);

    if (!departemnts) {
        return {
            title: "404 غير موجود",
        };
    }
    return {
        title: lang === "ar" ? departemnts.ArContent?.title : departemnts.EnContent?.title,
        description: lang === "ar" ? departemnts.ArContent?.body : departemnts.EnContent?.body,
    };
}
// export async function generateStaticParams({ params: { section: sectionId } }: {
//     params: { section: string; };

// }) {
//     const section = await getSectionById(sectionId);

//     return section?.departmentCoordinators?.map((page) => ({ departments: page.id }));
// }

const page = async ({ params: { lang, department: departmentId, section: id } }: { params: { lang: "ar" | "en"; department: string, section: string } }) => {
    const departemnt = await getDataById(departmentId);
    const section = await getSectionById(id)
    console.log("###########################")
    console.log(section?.departmentCoordinators)
    console.log("###########################")
    // console.log()

    return (
        <main className=' container '>
            <Lang ar={<ParseData content={departemnt?.ArContent?.body ?? ""} />} en={<ParseData content={departemnt?.EnContent?.body ?? ""} />} lang={lang} />
        </main>
    )
}

export default page