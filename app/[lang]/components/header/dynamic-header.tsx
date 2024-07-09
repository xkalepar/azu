// components/DynamicHeader.tsx
"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
// import SectionHeader from "./SectionHeader";

export const MainRender = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();

  if (!pathName.includes("collages") || !pathName.includes("sections")) {
    // console.log('fk libya')
    return children;
  } else {
    return <></>;
  }
};
export const CollageRender = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();
  if (pathName.includes("collages")) {
    return children;
  } else {
    return <></>;
  }
};
