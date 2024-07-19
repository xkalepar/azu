import { getDictionary } from "@/get-dictionary";
import { buttonVariants } from "@/lib/constant";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebookSquare } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { Lang } from "@/types/types";
import { SocialMedia } from "@prisma/client";
import Link from "next/link";
import React from "react";
import AddressMap from "../maps";
import { MainRender } from "../header/dynamic-header";

export const getDir = (lang: Lang): "rtl" | "ltr" =>
  lang === "ar" ? "rtl" : "ltr";
interface Props {
  lang: Lang;
  socialMedia: SocialMedia;
  className?: string;
}
const HomeFooter = async ({ lang, className, socialMedia }: Props) => {
  const dictionary = await getDictionary(lang);

  return (
    <MainRender>
      <footer
        className={cn("container py-10 bg-slate-300 ", className)}
        dir={getDir(lang)}
      >
        <div className="grid md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 sm:gap-4">
          <div className="flex flex-col justify-start items-start gap-2">
            <h4 className=" text-lg font-semibold">
              {dictionary.pages.univeristy.overview.title}
            </h4>
            <ul>
              <li className=" text-sm flex justify-start gap-2 items-center">
                <span>
                  {" "}
                  {dictionary.pages.univeristy.overview.footer.Address}
                  {": "}
                </span>
                <span>{socialMedia?.address}</span>
              </li>
              <li className=" text-sm flex justify-start gap-2 items-center">
                <span> {dictionary.pages.univeristy.overview.footer.Email}</span>
                {" :"}
                <span>{"info@azu.edu.ly"}</span>
              </li>
              <li className=" text-sm flex justify-start gap-2 items-center">
                <span> {dictionary.pages.univeristy.overview.footer.Phone}</span>
                {": "}
                <span>{"0537621379"}</span>
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
            <Link href={`https://wa.me/0537621379`} target="_blank" rel="noopener noreferrer" >
              <IoLogoWhatsapp color="#25d366" size={36} />
            </Link>
            <Link href={`https://wa.me/0537621380`} target="_blank" rel="noopener noreferrer" >
              <IoLogoWhatsapp color="#25d366" size={36} />
            </Link>
            <Link href={`https://www.facebook.com/profile.php?id=100064726957604`} target="_blank" rel="noopener noreferrer" >
              <FaFacebookSquare color="#1877f2" size={36} />
            </Link>
          </div>
          <div>
            <AddressMap />
          </div>
        </div>
      </footer>
    </MainRender>
  );
};

export default HomeFooter;
