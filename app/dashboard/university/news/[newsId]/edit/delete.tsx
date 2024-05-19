import { getNewsbyId } from "@/prisma/seed";
import { notFound } from "next/navigation";
import React from "react";
import { EditNewsForm } from "../../new/forms";
// import { EditNewsForm } from "../../../components/forms";

const page = async ({ params }: { params: { newsId: string } }) => {
  const { newsId: id } = params;
  console.log(params);
  const news = await getNewsbyId(id);
  console.log(news);
  if (news === undefined) {
    return notFound();
  }
  return (
    <section>
      <EditNewsForm
        body={news.arContent?.body}
        newsId={id}
        enBody={news.enContent?.body}
        enTitle={news.enContent?.title}
        image={news.image}
        title={news.arContent?.title}
      />
    </section>
  );
};

export default page;
