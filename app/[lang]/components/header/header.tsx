import { NavigationMenuHeader } from "./header-link";
import Logo from "./logo";
import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { buttonVariants } from "@/lib/constant";
import { cn } from "@/lib/utils";
import MobileNavigationBar from "./mobile-menu-bar";
import { CollageType } from "@/types/types";
import {
  ParseToScreenMoreThanWidth,
  ParseToScreenLessThanWidth,
} from "@/app/components/client-parser";
import { $Enums } from "@prisma/client";

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
};

const Header = ({ collages }: Props) => {
  // const dictionary = await getDictionary("ar");
  // const isDesktop = useMediaQuery("(min-width: 840px)");
  return (
    <Fragment>
      <header className="flex-between px-8 py-4">
        <Logo />
        <ParseToScreenMoreThanWidth>
          <Fragment>
            <NavigationMenuHeader collages={collages} />
            <Link
              className={cn(
                buttonVariants.default,
                buttonVariants.variants.variant.ghost,
                "px-2 py-1"
              )}
              href={`/ar`}
            >
              {"العربية"}
            </Link>
          </Fragment>
        </ParseToScreenMoreThanWidth>
        <ParseToScreenLessThanWidth>
          <MobileNavigationBar />
        </ParseToScreenLessThanWidth>
      </header>
      <Separator />
    </Fragment>
  );
};

export default Header;
