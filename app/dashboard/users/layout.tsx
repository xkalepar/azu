import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation';
import { Fragment, ReactNode } from 'react'

const layout = async ({ children }: {
    children: ReactNode
}) => {
    const user = await getSession();
    if (!user) {
        redirect('/login')
    }
    if (user.role !== "superAdmin") {
        if (user.role === "admin") {
            redirect(`/dashboard/collages/${user.collageId}`)
        } else {
            redirect('/login')
        }
    }
    return (
        <Fragment>{children}</Fragment>
    )
}

export default layout