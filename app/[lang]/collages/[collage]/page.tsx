import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import Image from "next/image";
import Statiscs from "../../components/statiscs";
import AnimatedCard from "../../components/animated-card";
import { cn } from "@/lib/utils";
import Footer from "../../components/footer";

const list = [
  "https://plus.unsplash.com/premium_photo-1675629118284-c9eb039df8cd?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714041691623-35d1b8c5e28b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1675629118284-c9eb039df8cd?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1705899853374-d91c048b81d2?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714287687895-e90e18587188?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714151676676-7471bc1a0794?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714138068544-b43633c10649?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714138107718-baa87d3ea624?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714224806668-9d8dc105f71e?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1675629118284-c9eb039df8cd?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714041691623-35d1b8c5e28b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1675629118284-c9eb039df8cd?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1705899853374-d91c048b81d2?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714287687895-e90e18587188?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714151676676-7471bc1a0794?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714138068544-b43633c10649?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714138107718-baa87d3ea624?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714224806668-9d8dc105f71e?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

// export async function generateMetadata({
//   params,
// }: {
//   params: { collage: string };
// }): Promise<Metadata> {
//   const product = await getProductById(params.collage);
//   if (!product?.name) {
//     return {
//       title: "404 غير موجود",
//     };
//   }
//   return {
//     title: product.name,
//     description: product.description,
//     keywords: [product.name, ...product.categories.map((c) => c.name)],
//   };
// }l
const CollagePage = async ({ params }: { params: { collage: string } }) => {
  //   const product = await getProductById(params.id);
  //   if (!product) {
  //     notFound();
  //   }
  //   const cities = await getCities();
  //   const incementViews = await incrementProductViews(product.id);
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
              تأسيس الكلية
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
            </span>
            رؤية ورسالة واهداف الكلية
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
            asperiores nihil, rem soluta vero autem aspernatur commodi
            laudantium in. Omnis mollitia neque, iure repellendus eligendi
            deleniti animi fugiat eius ducimus?
          </p>
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

        {/*  */}
        <div id="#management">
          <div className="my-4" />
          <h3 className="group  mb-4 font-bold text-xl hover:text-primary w-fit">
            <span className="hidden group-hover:inline-block transition-all">
              #
            </span>{" "}
            عمادة الكلية
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
              مجلس الكلية
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
              وكيل الكلية للشؤون العلمية
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
              الهيكل التنظيمي للكلية
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
                <h4 className="my-1 font-medium">
                  1- الخطة االستراتيجية للكلية
                </h4>
                <p className=" mx-1">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero
                  perspiciatis tempore voluptatibus officiis totam temporibus
                  maiores esse quisquam! Sit perferendis minus recusandae!
                </p>
              </li>
              <li>
                <h4 className="my-1 font-medium">2- اللوائح واالدلة</h4>
                <p className=" mx-1">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero
                  perspiciatis tempore voluptatibus officiis totam temporibus
                  maiores esse quisquam! Sit perferendis minus recusandae!
                </p>
              </li>
            </ol>
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className=" w-fit mx-auto my-2">
            <div className="w-[300px] h-[300px] rounded-sm overflow-hidden my-2">
              <Suspense fallback={<Skeleton className="w-full h-full" />}>
                <Image
                  src={list[0]}
                  alt={list[0]}
                  loading="lazy"
                  width={1000}
                  height={1000}
                  className="object-cover w-full scale-110 transition-all duration-300 hover:scale-100"
                />
              </Suspense>
            </div>
          </div>
        </AnimatedCard>

        <Footer />
        {/*  */}
      </section>
      <section></section>
    </main>
  );
};

export default CollagePage;

// export async function generateStaticParams() {
//   //   const products = await getAllProducts();
//   //   return products.map((product) => ({ id: product.id }));
// }
