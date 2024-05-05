import {
  HomeTabLinkNav,
  TabLink,
  TabLinkNav,
} from "@/app/dashboard/components/tab";
import { ReactNode } from "react";

const layout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) => {
  const { id } = params;
  return (
    <main>
      <div className="flex-between">
        <section className="md:flex-[2] lg:flex-[3] xl:flex-[4]">
          {children}
        </section>
        <section
          className=" border-r justify-center items-center
         w-full flex-1 border-secondary-foreground flex flex-col"
        >
          <HomeTabLinkNav
            content="عام"
            href={`/dashboard/collages/${id}/scientific-section`}
          />
          <TabLinkNav
            content="عام"
            href={`/dashboard/collages/${id}/scientific-section`}
          />
        </section>
      </div>
    </main>
  );
};

export default layout;
