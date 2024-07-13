"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export const MainRender = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();

  if (!pathName.includes("collages") || !pathName.includes("sections")) {
    return children;
  } else {
    return <></>;
  }
};
export const CollageRender = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();
  if (pathName.includes("collages") && !pathName.includes("sections")) {
    return children;
  } else {
    return <></>;
  }
};
export const SectionRender = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();
  if (pathName.includes("sections")) {
    return children;
  } else {
    return <></>;
  }
};
