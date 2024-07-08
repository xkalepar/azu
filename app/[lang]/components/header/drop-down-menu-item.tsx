"use client";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useParams } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import { ReactNode, useState } from "react"
import Lang from "../lang";
import { cn } from "@/lib/utils";
interface Props {
    title: ReactNode
    children?: ReactNode
}
export default function DropdownMenuButton({ title, children }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const { lang }: { lang: 'en' | 'ar' } = useParams()

    return (
        <Lang
            ar={<DropdownMenu dir="rtl" open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild >
                    <Button variant={"ghost"} className="flex justify-between items-center gap-1">
                        {title}
                        <IoIosArrowDown
                            className={cn('transition-all duration-300 text-xs', !open ? '' : ' rotate-180 ')}
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 z-[200]">
                    {/* <DropdownMenuLabel> {title} </DropdownMenuLabel> */}
                    {children}
                </DropdownMenuContent>
            </DropdownMenu>}
            en={
                <DropdownMenu dir="ltr" >
                    <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"} className="flex justify-between items-center gap-1">
                            {title}
                            <IoIosArrowDown
                                className={cn('transition-all duration-300 text-xs', !open ? '' : ' rotate-180 ')}
                            />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 z-[200]">
                        {/* <DropdownMenuLabel> {title} </DropdownMenuLabel> */}
                        {children}
                    </DropdownMenuContent>
                </DropdownMenu>
            }
            lang={lang}
        />
    )
}
