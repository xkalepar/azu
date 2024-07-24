import ParseData from '@/app/components/parse-data'
import { getUserById, } from '@/app/dashboard/sections/[collageId]/[sectionId]/teachers/seed'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/lib/constant'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { env } from 'process'
import React from 'react'

const page = async ({ params: { teacher: teacherId } }: { params: { teacher: string } }) => {
    const teacher = await getUserById({ userId: teacherId })
    return (
        <main className='flex container justify-between items-start sm:flex-row flex-col-reverse'>
            <section className='sm:flex-[2]'>
                <ParseData content={teacher?.content ?? ""} />
            </section>
            <section className='w-full sm:w-fit'>
                <div className='w-full sm:flex-1 h-[200px] max-h-[200px] rounded-sm'>
                    <Image
                        src={teacher?.image ?? env.NotFoundImage as string}
                        alt={teacher?.fullName ?? "nothing"}
                        loading="lazy"
                        width={1000}
                        height={1000}
                        className="object-cover w-full h-full"
                    />
                </div>
                <Link className={cn("w-full rounded-md flex-center", buttonVariants.variants.size.default, buttonVariants.variants.variant.default)} href={teacher?.cv ?? "#"} target={"_blank"}>
                    تنزيل cv
                </Link>
            </section>
        </main>
    )
}

export default page