import { getUniversity } from "@/prisma/seed";
import UniveristyForm from "../components/forms";
enum Lang {
  ar = "ar",
  en = "en",
}
const page = async () => {
  const univeristy = await getUniversity();
  return (
    <main className=" container ">
      <>
        <UniveristyForm
          content={univeristy?.ArContent?.body}
          enContent={univeristy?.EnContent?.body}
        />
      </>
    </main>
  );
};

export default page;
