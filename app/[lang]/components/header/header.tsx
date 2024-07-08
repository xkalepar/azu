import Logo from "./logo";
import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { buttonVariants } from "@/lib/constant";
import { cn } from "@/lib/utils";
import MobileNavigationBar from "./mobile-menu-bar";
import {
  ParseToScreenMoreThanWidth,
  ParseToScreenLessThanWidth,
} from "@/app/components/client-parser";
import { $Enums, Centers } from "@prisma/client";
import { DesktopMenuHeader } from "./desktop-menu-bar";

type Props = {
  collages: ({
    ArCollageData: {
      id: string;
      title: string;
      content: string;
    } | null;
    EnCollageData: {
      id: string;
      title: string;
      content: string;
    } | null;
  } & {
    id: string;
    logo: string;
    arabicId: string | null;
    englishId: string | null;
    category: $Enums.Category;
  })[];
  lang?: "ar" | "en";
  logo?: string;
  centers?: ({
    arContent?: {
      id: string;
      title: string;
      body: string;
    } | null;
    enContent?: {
      id: string;
      title: string;
      body: string;
    } | null;
  } & {
    id: string;
    arContentId: string | null;
    enContentId: string | null;
    universityId: string | null;
  })[];
  academicPrograms?: ({
    arContent?: {
      id: string;
      title: string;
      body: string;
    } | null;
    enContent?: {
      id: string;
      title: string;
      body: string;
    } | null;
  } & {
    id: string;
    arContentId: string | null;
    enContentId: string | null;
    universityId: string | null;
  })[];
  scientificResearchs?: ({
    arContent?: {
      id: string;
      title: string;
      body: string;
    } | null;
    enContent?: {
      id: string;
      title: string;
      body: string;
    } | null;
  } & {
    id: string;
    arContentId: string | null;
    enContentId: string | null;
    universityId: string | null;
  })[];
  projects?: ({
    arContent?: {
      id: string;
      title: string;
      body: string;
    } | null;
    enContent?: {
      id: string;
      title: string;
      body: string;
    } | null;
  } & {
    id: string;
    arContentId: string | null;
    enContentId: string | null;
    universityId: string | null;
  })[];
  graduates?: ({
    arContent?: {
      id: string;
      title: string;
      body: string;
    } | null;
    enContent?: {
      id: string;
      title: string;
      body: string;
    } | null;
  } & {
    id: string;
    arContentId: string | null;
    enContentId: string | null;
    universityId: string | null;
  })[];
  actvities?: ({
    arContent?: {
      id: string;
      title: string;
      body: string;
    } | null;
    enContent?: {
      id: string;
      title: string;
      body: string;
    } | null;
  } & {
    id: string;
    arContentId: string | null;
    enContentId: string | null;
    universityId: string | null;
  })[];
};

const Header = ({
  collages,
  centers,
  academicPrograms,
  scientificResearchs,
  actvities,
  graduates,
  projects,
  lang = "ar",
  logo = "https://utfs.io/f/5be98e8b-80a7-4898-a05a-5e8d330548a0-7plzqw.jpg",
}: Props) => {
  return (
    <Fragment>
      <header className="flex items-center justify-between gap-2 w-full bg-background  px-8 py-4 fixed max-h-20 min-h-20 top-0 z-[150] left-0">
        <Logo href={`/${lang}`} src={logo} />
        <ParseToScreenMoreThanWidth>
          <div className=" flex-between gap-2">
            <DesktopMenuHeader
              collages={collages}
              centers={centers}
              academicPrograms={academicPrograms}
              scientificResearchs={scientificResearchs}
              actvities={actvities}
              graduates={graduates}
              projects={projects}
            />
            <Link
              className={cn(
                buttonVariants.default,
                buttonVariants.variants.variant.ghost,
                "px-2 py-1"
              )}
              href={`${lang === "en" ? "/ar" : "/en"}`}
            >
              {lang === "en" ? "العربية" : "english"}
            </Link>
          </div>
        </ParseToScreenMoreThanWidth>
        <ParseToScreenLessThanWidth>
          <MobileNavigationBar
            collages={collages}
            centers={centers}
            academicPrograms={academicPrograms}
            scientificResearchs={scientificResearchs}
            actvities={actvities}
            graduates={graduates}
            projects={projects}
          />
        </ParseToScreenLessThanWidth>
      </header>
      <Separator />
    </Fragment>
  );
};

export default Header;
