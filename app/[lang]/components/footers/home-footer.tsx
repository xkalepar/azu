import { getDictionary } from "@/get-dictionary";
import { buttonVariants } from "@/lib/constant";

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
      <section
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
                {": "}
                <span>{socialMedia?.email}</span>
              </li>
              <li className=" text-sm flex justify-start gap-2 items-center">
                <span> {dictionary.pages.univeristy.overview.footer.Phone}</span>
                {": "}
                <span>{socialMedia?.phone1}</span>
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
          <div>
            <AddressMap />
          </div>
        </div>
      </section>
    </MainRender>
  );
};

export default HomeFooter;
