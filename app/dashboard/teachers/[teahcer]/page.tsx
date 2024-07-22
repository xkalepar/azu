import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const pages = async ({ params: { teacher: id } }: {
    params: { teacher: string }
}) => {
    const user = await getSession()
    if (!user) {
        redirect('/login')
    }
    if (user.role !== "teacher") {
        if (user.role === "superAdmin") {
            redirect('/dashboard/users')
        } else if (user.role === "admin") {
            redirect(`/dashboard/collages/${user.collageId}`)
        }
        else {
            redirect('login')
        }
    }
    return (
        <main>pages</main>
    )
}

export default pages