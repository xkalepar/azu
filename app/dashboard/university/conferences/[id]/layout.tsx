import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return <React.Fragment>{children}</React.Fragment>;
};

export default layout;
