import Lang from '@/app/[lang]/components/lang';
import ParseData from '@/app/components/parse-data';
import { getDataById } from '@/app/dashboard/sections/[collageId]/[sectionId]/academic-guidance-handbook/seed';
import { Metadata } from 'next';
import React from 'react'

export async function generateMetadata({
    params: { id, lang }
}: {
    params: { section: string; lang: "ar" | "en"; id: string };
}): Promise<Metadata> {
    const departemnts = await getDataById(id);

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

const page = async ({ params: { lang, department: departmentId, } }: { params: { lang: "ar" | "en"; department: string, } }) => {
    const departemnt = await getDataById(departmentId);
    return (
        <main className=' container '>
            <Lang ar={<ParseData content={departemnt?.ArContent?.body ?? ""} />} en={<ParseData content={departemnt?.EnContent?.body ?? ""} />} lang={lang} />
        </main>
    )
}

export default page