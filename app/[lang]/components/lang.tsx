import React, { Fragment, ReactNode } from "react";
type Props = {
  ar: ReactNode;
  en: ReactNode;
  lang: "ar" | "en";
};
const Lang = ({ lang, ar, en }: Props) => {
  return <Fragment>{lang === "ar" ? <>{ar}</> : <>{en}</>}</Fragment>;
};

export default Lang;
