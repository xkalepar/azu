import { getUsers } from '@/app/dashboard/sections/[collageId]/[sectionId]/teachers/seed'
import React from 'react'
import SearchForm from './components/search'
import CardPreview from '@/app/components/card-preview'

const page = async ({ searchParams, params: { section: sectionId, lang } }: {
    searchParams?: { query?: string }, params: {
        section: string; lang: "ar" | "en"
    }
}) => {
    const teachers = await getUsers({ role: "teacher", query: searchParams?.query, sectionId })
    return (
        <main className='container'>
            <SearchForm placeholder={'بحث'} />
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-2 sm:gap-4'>
                {teachers.map((teacher, i) => (
                    <CardPreview key={i} href={`teachers/${teacher.id}`} title={teacher.fullName} lang={lang} src={teacher?.image ?? undefined}>
                    </CardPreview>
                ))}
            </div>
        </main>
    )
}

export default page