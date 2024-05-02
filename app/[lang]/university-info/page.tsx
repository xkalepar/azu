import { cn } from "@/lib/utils";
import Statiscs from "../components/statiscs";
import AnimatedCard from "../components/animated-card";
import ImageGridView from "../components/image-grid-view";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

import { Suspense } from "react";
import Footer from "../components/footer";
const list = [
  "https://plus.unsplash.com/premium_photo-1675629118284-c9eb039df8cd?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714041691623-35d1b8c5e28b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1675629118284-c9eb039df8cd?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
const page = async () => {
  return (
    <main className=" w-full mx-auto px-4 sm:px-8 md:px-12 xl:px-40" dir="rtl">
      <section className={cn("mt-4 ")}>
        <div
          id="#overview"
          className="flex flex-col-reverse sm:flex-row gap-4 my-3"
        >
          <div className="flex-0 sm:w-3/4 sm:text-justify">
            <h1 className="group mb-4 font-bold text-xl transition-all hover:text-primary w-fit">
              <span className=" hidden group-hover:inline-block transition-all">
                #
              </span>{" "}
              تأسيس الجامعة{""}
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              asperiores nihil, rem soluta vero autem aspernatur commodi
              laudantium in. Omnis mollitia neque, iure repellendus eligendi
              deleniti animi fugiat eius ducimus? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Neque asperiores nihil, rem soluta
              vero autem aspernatur commodi laudantium in. Omnis mollitia neque,
              iure repellendus eligendi deleniti animi fugiat eius ducimus?
            </p>
          </div>

          <div className="w-full h-[300px] rounded-sm overflow-hidden my-2">
            <Suspense fallback={<Skeleton className="w-full h-full" />}>
              <Image
                src={list[0]}
                alt={list[0]}
                loading="lazy"
                width={1000}
                height={1000}
                className=" object-cover w-full h-full"
              />
            </Suspense>
          </div>
        </div>
        <div id="#goals">
          <div className="my-4" />
          <h2 className="group  mb-4 font-bold text-xl  hover:text-primary w-fit">
            <span className="hidden group-hover:inline-block transition-all">
              #
            </span>{" "}
            رؤية و رسالة و اهداف الجامعة{" "}
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
            asperiores nihil, rem soluta vero autem aspernatur commodi
            laudantium in. Omnis mollitia neque, iure repellendus eligendi
            deleniti animi fugiat eius ducimus?
          </p>
        </div>
        <div id="#statiscs">
          <div className="my-4" />
          <Statiscs>
            <h3 className="group  mb-4 font-bold text-xl hover:text-primary w-fit">
              <span className="hidden group-hover:inline-block transition-all">
                #
              </span>{" "}
              احصائيات الجامعة{" "}
            </h3>
          </Statiscs>
        </div>
        <div id="#rating">
          <div className="my-4" />
          <h3 className="group  mb-4 font-bold text-xl hover:text-primary w-fit">
            <span className="hidden group-hover:inline-block transition-all">
              #
            </span>{" "}
            الأعتماد و التصنيف{" "}
          </h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto
            nihil ullam excepturi, odio, dolorum quos amet expedita culpa
            commodi, provident reiciendis repudiandae dicta eaque pariatur
            quaerat eius tempora temporibus modi.
          </p>
        </div>
        {/*  */}
        <div id="#management">
          <div className="my-4" />
          <h3 className="group  mb-4 font-bold text-xl hover:text-primary w-fit">
            <span className="hidden group-hover:inline-block transition-all">
              #
            </span>{" "}
            رئاسة الجامعة
          </h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto
            nihil ullam excepturi, odio, dolorum quos amet expedita culpa
            commodi, provident reiciendis repudiandae dicta eaque pariatur
            quaerat eius tempora temporibus modi.
          </p>
        </div>
        <AnimatedCard>
          {/*  */}
          <div id="#desk">
            <div className="my-4" />
            <h3
              id="#desk"
              className="group  mb-4 font-bold text-xl hover:text-primary w-fit"
            >
              <span className="hidden group-hover:inline-block transition-all">
                #
              </span>{" "}
              مكتب الجامعة
            </h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Architecto nihil ullam excepturi, odio, dolorum quos amet expedita
              culpa commodi, provident reiciendis repudiandae dicta eaque
              pariatur quaerat eius tempora temporibus modi.
            </p>
          </div>
        </AnimatedCard>

        <AnimatedCard>
          {/*  */}
          <div id="#desksetup">
            <div className="my-4" />
            <h3
              id="#desksetup"
              className="group  mb-4 font-bold text-xl hover:text-primary w-fit"
            >
              <span className="hidden group-hover:inline-block transition-all">
                #
              </span>{" "}
              مكتب شؤون مجلس الجامعة
            </h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Architecto nihil ullam excepturi, odio, dolorum quos amet expedita
              culpa commodi, provident reiciendis repudiandae dicta eaque
              pariatur quaerat eius tempora temporibus modi.
            </p>
          </div>
        </AnimatedCard>

        <AnimatedCard>
          {/*  */}
          <div id="#shoon">
            <div className="my-4" />
            <h3 className="group  mb-4 font-bold text-xl hover:text-primary w-fit">
              <span className="hidden group-hover:inline-block transition-all">
                #
              </span>{" "}
              وكيل الجامعة للشؤون العلمية
            </h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Architecto nihil ullam excepturi, odio, dolorum quos amet expedita
              culpa commodi, provident reiciendis repudiandae dicta eaque
              pariatur quaerat eius tempora temporibus modi.
            </p>
          </div>
        </AnimatedCard>

        <AnimatedCard>
          {/*  */}
          <div id="#structure">
            <div className="my-4" />
            <h3 className="group  mb-4 font-bold text-xl hover:text-primary w-fit">
              <span className="hidden group-hover:inline-block transition-all">
                #
              </span>{" "}
              الهيكل التنظيمي للجامعة
            </h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Architecto nihil ullam excepturi, odio, dolorum quos amet expedita
              culpa commodi, provident reiciendis repudiandae dicta eaque
              pariatur quaerat eius tempora temporibus modi.
            </p>
            {/* ################ */}
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div id="#lists">
            <div className="my-4" />
            <h3
              id="#lists"
              className="group  mb-4 font-bold text-xl hover:text-primary w-fit"
            >
              <span className="hidden group-hover:inline-block transition-all">
                #
              </span>{" "}
              سياسات و لوائح
            </h3>
            <ol className=" mx-2">
              <li>
                <h4 className="my-1 font-medium">1- سياسات و لوائح</h4>
                <p className=" mx-1">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero
                  perspiciatis tempore voluptatibus officiis totam temporibus
                  maiores esse quisquam! Sit perferendis minus recusandae!
                </p>
              </li>
              <li>
                <h4 className="my-1 font-medium">2- اللوائح</h4>
                <p className=" mx-1">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero
                  perspiciatis tempore voluptatibus officiis totam temporibus
                  maiores esse quisquam! Sit perferendis minus recusandae!
                </p>
              </li>
              <li>
                <h4 className="my-1 font-medium">3- اتفاقيات الجامعة</h4>
                <p className=" mx-1">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero
                  perspiciatis tempore voluptatibus officiis totam temporibus
                  maiores esse quisquam! Sit perferendis minus recusandae!
                </p>
              </li>
            </ol>
          </div>
        </AnimatedCard>
        <Footer />
        {/*  */}
      </section>
      <section></section>
    </main>
  );
};

export default page;
