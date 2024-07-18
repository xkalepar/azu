import { getCollageById, getCollageByIdForSection } from "@/prisma/seed";
import { notFound } from "next/navigation";
import React, { ReactNode } from "react";
import CollegeHeader from "../../components/header/collage-header";
import { CollageRender } from "../../components/header/dynamic-header";
import { Metadata } from "next";
import { getData as getGraduates } from "@/app/dashboard/collages/[id]/graduate-studies/seed";
import { getData as getOffices } from "@/app/dashboard/collages/[id]/offices-and-administrative-departments/seed";
import CollageFooter from "../../components/footers/collage-footer";
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
  const { collage: id } = params;
  const graduate = await getGraduates({ id });
  const collage = await getCollageByIdForSection(id)
  const offices = await getOffices({ id })

  if (!collage) return notFound();
  const formattedGradautes = graduate.map((pages) => {
    return pages.Pages.map((page) => ({
      title: page.title,
      enTitle: page.enTitle,
      body: page.body,
      enBody: page.enBody,
      id: page.id
    }))
  });
  const formattedOffices = offices.map((pages) => {
    return pages.Pages.map((page) => ({
      title: page.title,
      enTitle: page.enTitle,
      body: page.body,
      enBody: page.enBody,
      id: page.id
    }))
  });
  const formattedSections = collage.ScientificSection.map((page) => {
    return {
      title: page.ArContent?.title,
      enTitle: page.EnContent?.title,
      body: page.ArContent?.body,
      enBody: page.EnContent?.body,
      id: page.id
    }
  });

  return (
    <main className="min-h-screen flex flex-col justify-between ">
      <CollageRender>
        <CollegeHeader
          sections={formattedSections}
          // gradutes={graduatesData}
          category={collage.category}
          logo={collage.logo}
          id={collage.id}
          ArCollageData={collage.ArCollageData}
          EnCollageData={collage.EnCollageData
          }
          graduates={
            formattedGradautes
          }

          offices={formattedOffices} />

      </CollageRender>

      {children}

      <CollageFooter lang={"ar"} socialMedia={{
        facebook: null,
        whatsapp: null,
        youtube: null,
        email: null,
        telegram: null,
        phone1: null,
        phone2: null,
        fax: null,
        x: null,
        address: null,
        location: collage?.SocialMedia?.location
      }} />

    </main>
  );
};

export default layout;
