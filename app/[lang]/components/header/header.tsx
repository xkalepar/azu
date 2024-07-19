import Logo from "./logo";
import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";
import MobileNavigationBar from "./mobile-menu-bar";
import {
  ParseToScreenMoreThanWidth,
  ParseToScreenLessThanWidth,
} from "@/app/components/client-parser";
import { $Enums, Centers } from "@prisma/client";
import { DesktopMenuHeader } from "./desktop-menu-bar";
import ToggleLangauge from "./toggle-lang";
import RenderToRole, { DontRenderUnlessSessionIsDefined } from "@/app/components/render-to-role";
import Link from "next/link";
import Lang from "../lang";
import { getSession } from "@/lib/auth";
import { MainRender } from "./dynamic-header";

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

const Header = async ({
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
  const currnetUser = await getSession()
  return (
    <Fragment>
      <MainRender>
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
              >
                <>
                  <DontRenderUnlessSessionIsDefined currnetUser={currnetUser} >
                    <Link className="text-sm" href={`/${lang}/login`}>
                      <Lang lang={lang} ar={"تسجيل الدخول"} en={"login"} />
                    </Link>

                  </DontRenderUnlessSessionIsDefined>
                  <RenderToRole currnetUser={currnetUser} appliedRole={"admin"}>
                    <Link className=" text-sm " href={`/dashboard/collages`}>
                      <Lang lang={lang} ar={"لوحة التحكم"} en={"dashboard"} />
                    </Link>

                  </RenderToRole>
                </>
              </DesktopMenuHeader>

            </div>


            <ToggleLangauge />

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
            >
              <>
                <DontRenderUnlessSessionIsDefined currnetUser={currnetUser} >
                  <Link className="text-sm" href={`/${lang}/login`}>
                    <Lang lang={lang} ar={"تسجيل الدخول"} en={"login"} />
                  </Link>

                </DontRenderUnlessSessionIsDefined>
                <RenderToRole currnetUser={currnetUser} appliedRole={"admin"}>
                  <Link className=" text-sm " href={`/dashboard/collages`}>
                    <Lang lang={lang} ar={"لوحة التحكم"} en={"dashboard"} />
                  </Link>

                </RenderToRole>
              </>

            </MobileNavigationBar>
          </ParseToScreenLessThanWidth>
        </header>
      </MainRender>
      <Separator />
    </Fragment>
  );
};

export default Header;
