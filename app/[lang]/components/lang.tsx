import React, { Fragment, ReactNode } from "react";
type Props = {
  ar?: ReactNode;
  en?: ReactNode;
  lang: Locale;
};
const Lang = ({ lang, ar, en }: Props) => {
  return (
    <Fragment>
      {lang === "en" ? (
        <>{en ?? "no content was uploaded"}</>
      ) : (
        <>{ar ?? "لا يوجد محتوى"}</>
      )}
    </Fragment>
  );
};

export default Lang;
