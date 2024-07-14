import { getUsers } from '@/app/dashboard/sections/[collageId]/[sectionId]/teachers/seed'
import React from 'react'
import SearchForm from './components/search'

const page = async ({ searchParams, params: { section: sectionId } }: {
    searchParams?: { query?: string }, params: {
        section: string
    }
}) => {
    const teachers = await getUsers({ role: "teacher", query: searchParams?.query, sectionId })
    return (
        <main>
            <SearchForm placeholder={'بحث'} />
            {teachers.map((teacher, i) => (<div key={i}> {teacher.fullName} </div>))}
        </main>
    )
}

export default page