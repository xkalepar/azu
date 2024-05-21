"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import React, { Fragment, ReactNode } from "react";

const ClientParser = ({ children }: { children: React.ReactNode }) => {
  return <Fragment>{children}</Fragment>;
};

export default ClientParser;

const ParseToScreenMoreThanWidth = ({
  width = "1200",
  children,
}: {
  width?: string;
  children: ReactNode;
}) => {
  const IstheScreenTrue = useMediaQuery(`(min-width: ${width})`);

  return <Fragment>{IstheScreenTrue && children}</Fragment>;
};
const ParseToScreenLessThanWidth = ({
  width = "1200",
  children,
}: {
  width?: string;
  children: ReactNode;
}) => {
  const IstheScreenTrue = useMediaQuery(`(max-width: ${width})`);

  return <Fragment>{IstheScreenTrue && children}</Fragment>;
};

export { ParseToScreenMoreThanWidth, ParseToScreenLessThanWidth };
