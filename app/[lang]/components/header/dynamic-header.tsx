// components/DynamicHeader.tsx
"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
// import SectionHeader from "./SectionHeader";

export const RenderMainHeader = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();
  if (!pathName.includes("collages") || !pathName.includes("sections")) {
    return children;
  } else {
    return <></>;
  }
};
export const RenderCollageHeader = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();
  if (pathName.includes("collages")) {
    return children;
  } else {
    return <></>;
  }
};
