import { getCollageById } from "@/prisma/seed";
import { notFound } from "next/navigation";
import React, { ReactNode } from "react";
import CollegeHeader from "../../components/header/collage-header";
import { RenderCollageHeader } from "../../components/header/dynamic-header";
import { Metadata } from "next";
export async function generateMetadata({
  params,
}: {
  params: { collage: string; lang: "ar" | "en" };
}): Promise<Metadata> {
  const collage = await getCollageById(params.collage);
  if (!collage) {
    return {
      title: "404 غير موجود",
    };
  }
  return {
    title: collage.ArCollageData!.title,
    description: collage.ArCollageData!.content,
    icons: collage.logo,
  };
}
const layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { collage: string; lang: "ar" | "en" };
}) => {
  const collage = await getCollageById(params.collage);
  if (!collage) return notFound();
  const { lang } = params;
  return (
    <main>
      <RenderCollageHeader>
        <CollegeHeader
          category={collage.category}
          logo={collage.logo}
          id={collage.id}
          ArCollageData={collage.ArCollageData}
          EnCollageData={collage.EnCollageData}
        />
      </RenderCollageHeader>
      {children}
    </main>
  );
};

export default layout;
