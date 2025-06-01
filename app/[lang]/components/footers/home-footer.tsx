import { getDictionary } from "@/get-dictionary";
import { buttonVariants } from "@/lib/constant";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebookSquare } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { Lang } from "@/types/types";
import Link from "next/link";
import React from "react";
import AddressMap from "../maps";
import { MainRender } from "../header/dynamic-header";
// export default HomeFooter;

// import React from 'react';
import { Mail, MapPin, Contact } from "lucide-react";
import { getTranslation } from "@/lib/i18n";

export const getDir = (lang: Lang): "rtl" | "ltr" =>
  lang === "ar" ? "rtl" : "ltr";
interface Props {
  lang: Locale;
  className?: string;
}
const HomeFooter = async ({ lang, className }: Props) => {
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
              {/* <li className=" text-sm flex justify-start gap-2 items-center">
                <span>
                  {" "}
                  {dictionary.pages.univeristy.overview.footer.Address}
                  {": "}
                </span>
              <span>{socialMedia?.address}</span> 
              </li> */}
              <li className=" text-sm flex justify-start gap-2 items-center">
                <span>
                  {" "}
                  {dictionary.pages.univeristy.overview.footer.Email}
                </span>
                {" :"}
                <span>{"info@azu.edu.ly"}</span>
              </li>
              <li className=" text-sm flex justify-start gap-2 items-center">
                <span>
                  {" "}
                  {dictionary.pages.univeristy.overview.footer.Phone}
                </span>
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
            <Link
              href={`https://wa.me/0537621379`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoLogoWhatsapp color="#25d366" size={36} />
            </Link>
            <Link
              href={`https://wa.me/0537621380`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoLogoWhatsapp color="#25d366" size={36} />
            </Link>
            <Link
              href={`https://www.facebook.com/profile.php?id=100064726957604`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookSquare color="#1877f2" size={36} />
            </Link>
          </div>
          <div>
            <AddressMap src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3367.6001064448583!2d13.632029775648387!3d32.42986827381068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzLCsDI1JzQ3LjUiTiAxM8KwMzgnMDQuNiJF!5e0!3m2!1sen!2sly!4v1722762558324!5m2!1sen!2sly" />
          </div>
        </div>
      </footer>
    </MainRender>
  );
};

const Footer = async ({ lang, className }: Props) => {
  const quickLinks = [
    { key: "about", href: "#about" },
    { key: "faculties", href: "#faculties" },
    { key: "admissions", href: "#admissions" },
    { key: "contact", href: "#contact" },
  ] as const;

  return (
    <div className="">
      <AddressMap src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3367.6001064448583!2d13.632029775648387!3d32.42986827381068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzLCsDI1JzQ3LjUiTiAxM8KwMzgnMDQuNiJF!5e0!3m2!1sen!2sly!4v1722762558324!5m2!1sen!2sly" />

      <footer className="bg-gradient-to-br from-forest-900 via-forest-800 to-sage-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-start w-full justify-around">
            {/* University Info */}
            <div className={cn("md:flex justify-center items-start")}>
              <div className="space-y-4 ">
                <h3 className="text-xl font-bold text-sage-300">
                  {getTranslation(lang, "universityName")}
                </h3>
                <p className="text-sage-100 leading-relaxed">
                  {getTranslation(lang, "aboutDescription")}
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className={cn("md:flex justify-center items-start")}>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-sage-300">
                  {getTranslation(lang, "quickLinks")}
                </h3>
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.key}>
                      <a
                        href={link.href}
                        className="text-sage-200 hover:text-sage-300 transition-colors duration-200"
                      >
                        {getTranslation(lang, link.key)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className={cn("md:flex justify-center items-start")}>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-sage-300">
                  {getTranslation(lang, "contactInfo")}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-sage-300" />
                    <span className="text-sage-100">
                      {getTranslation(lang, "address")}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-sage-300" />
                    <span className="text-sage-100">
                      {getTranslation(lang, "email")}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Contact className="h-5 w-5 text-sage-300" />
                    <span className="text-sage-100">
                      {getTranslation(lang, "phone")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-forest-700 mt-8 pt-8 text-center">
            <p className="text-sage-200">
              © {new Date().getFullYear()}{" "}
              {getTranslation(lang, "universityName")}.{" "}
              {getTranslation(lang, "allRightsReserved")}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
