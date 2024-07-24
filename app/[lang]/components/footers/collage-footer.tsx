import { getDictionary } from "@/get-dictionary";
import { buttonVariants } from "@/lib/constant";

import { cn } from "@/lib/utils";
import { Lang } from "@/types/types";
import Link from "next/link";
import React from "react";
import AddressMap from "../maps";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

type SocialMedia = {
    facebook?: string | null
    whatsapp?: string | null
    youtube?: string | null
    email?: string | null
    telegram?: string | null
    phone1?: string | null
    phone2?: string | null
    fax?: string | null
    x?: string | null
    address?: string | null
    location?: string | null
}
export const getDir = (lang: Lang): "rtl" | "ltr" =>
    lang === "ar" ? "rtl" : "ltr";
interface Props {
    lang: Lang;
    socialMedia: SocialMedia;
    className?: string;
    title?: string
}
const CollageFooter = async ({ lang, socialMedia, title }: Props) => {
    const dictionary = await getDictionary(lang)
    return <footer className="container bg-slate-300">
        <div className="grid md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 sm:gap-4">
            <div className="flex flex-col justify-start items-start gap-2">
                <h4 className=" text-lg font-semibold">
                    {title}
                </h4>
                <ul>
                    {/* <li className=" text-sm flex justify-start gap-2 items-center">
                        <span>
                            {" "}
                            {dictionary.pages.univeristy.overview.footer.Address}
                            {": "}
                        </span>
                        <span>{socialMedia?.address}</span>
                    </li> */}
                    <li className=" text-sm flex justify-start gap-2 items-center">
                        <span> {dictionary.pages.univeristy.overview.footer.Email}</span>
                        {":"}
                        <span>{socialMedia?.email}</span>
                    </li>
                    <li className=" text-sm flex justify-start gap-2 items-center">
                        <span> {dictionary.pages.univeristy.overview.footer.Phone}</span>
                        {":"}
                        <span>{socialMedia?.phone1}</span>
                    </li>
                    <li className=" text-sm flex justify-start gap-2 items-center">
                        <span> {dictionary.pages.univeristy.overview.footer.Phone}</span>
                        {":"}
                        <span>{socialMedia?.phone2}</span>
                    </li>
                </ul>
            </div>

            <div className="flex flex-col justify-start items-start gap-2">
                <h4 className="text-lg font-semibold">
                    {dictionary.pages.univeristy.overview.quickAccess.quickAccess}
                </h4>
                <ul>
                    <li className=" text-sm">
                        <Link
                            className={cn(
                                buttonVariants.default,
                                buttonVariants.variants.variant.link,
                                // buttonVariants.variants.size.default
                                lang === "en" ? "text-left" : "text-right"
                            )}
                            href={`/`}
                        >
                            {dictionary.pages.univeristy.overview.quickAccess.home}
                        </Link>
                    </li>
                    <li className="text-sm">
                        <Link
                            className={cn(
                                buttonVariants.default,
                                buttonVariants.variants.variant.link,
                                lang === "en" ? "text-left" : "text-right"
                                // buttonVariants.variants.size.default
                            )}
                            href={`/university-info`}
                        >
                            {dictionary.pages.univeristy.overview.quickAccess.about}
                        </Link>
                    </li>
                    <li className=" text-sm">
                        <Link
                            className={cn(
                                buttonVariants.default,
                                buttonVariants.variants.variant.link,
                                // buttonVariants.variants.size.default
                                lang === "en" ? "text-left" : "text-right"
                            )}
                            href={`/news`}
                        >
                            {dictionary.pages.univeristy.overview.quickAccess.LatestNews}
                        </Link>
                    </li>
                    <li className=" text-sm">
                        <Link
                            className={cn(
                                buttonVariants.default,
                                buttonVariants.variants.variant.link,
                                // buttonVariants.variants.size.default
                                lang === "en" ? "text-left" : "text-right"
                            )}
                            href={`/`}
                        >
                            {dictionary.pages.univeristy.overview.quickAccess.contact}
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="flex justify-center w-full items-start gap-2">
                <Link href={`https://wa.me/${socialMedia.whatsapp}`} target="_blank" rel="noopener noreferrer" >
                    <IoLogoWhatsapp color="#25d366" size={36} />
                </Link>
                <Link href={socialMedia?.facebook ?? "#"} target="_blank" rel="noopener noreferrer" >
                    <FaFacebookSquare color="#1877f2" size={36} />
                </Link>
                <Link href={socialMedia?.x ?? "#"} target="_blank" rel="noopener noreferrer" >
                    <FaSquareXTwitter color="#000" size={36} />
                </Link>
            </div>


            <div>
                <AddressMap src={socialMedia?.location ?? "https://maps.app.goo.gl/XoZdgCKCKELtEtsj7"} />
            </div>
        </div>
    </footer>
};

export default CollageFooter;
