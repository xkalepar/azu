import { getUniversity } from "@/prisma/seed";
import { env } from "process";
import React from "react";
const id: string = env.UniveristyId as string;
const page = async () => {
  const university = await getUniversity();
  console.log(university);
  console.log(id);
  return <div>{id}</div>;
};

export default page;
