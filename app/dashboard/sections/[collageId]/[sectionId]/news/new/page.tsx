import { BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { NewsForm } from "../../components/forms";
import Breadcrumbs from "../components/breadcrumbs";
import {
  FinalBreadcrumbItem,
  LinkBreadcrumbItem,
} from "../../components/breadcrumbs";

const page = async ({
  params,
}: {
  params: { sectionId: string; collageId: string };
}) => {
  const { collageId, sectionId } = params;
  return (
    <section>
      <Breadcrumbs collageId={params.collageId} sectionId={params.sectionId}>
        <BreadcrumbSeparator />

        <LinkBreadcrumbItem
          href={`/dashboard/sections/${collageId}/${sectionId}/news`}
        >
          الأخبار
        </LinkBreadcrumbItem>
        <BreadcrumbSeparator />
        <FinalBreadcrumbItem>{"جديد"}</FinalBreadcrumbItem>
      </Breadcrumbs>
      <NewsForm sectionId={params.sectionId} collageId={params.collageId} />
    </section>
  );
};

// const Breadcrumbs = ({
//   collageTitle: title,
//   collageId,
// }: {
//   collageTitle?: string;
//   collageId: string;
// }) => {
//   return (
//     <Breadcrumb>
//       <BreadcrumbList>
//         <BreadcrumbItem>
//           <BreadcrumbLink asChild>
//             <Link href="/">الرئيسية</Link>
//           </BreadcrumbLink>
//         </BreadcrumbItem>
//         <BreadcrumbSeparator />
//         <BreadcrumbItem>
//           <BreadcrumbLink asChild>
//             <Link href="/dashboard">لوحة التحكم</Link>
//           </BreadcrumbLink>
//         </BreadcrumbItem>
//         <BreadcrumbSeparator />
//         <BreadcrumbItem>
//           <BreadcrumbLink asChild>
//             <Link href="/dashboard/collages">الكليات</Link>
//           </BreadcrumbLink>
//         </BreadcrumbItem>
//         <BreadcrumbSeparator />
//         <BreadcrumbItem>
//           <BreadcrumbLink asChild>
//             <Link href={`/dashboard/collages/${collageId}`}>
//               {title ?? ".."}
//             </Link>
//           </BreadcrumbLink>
//         </BreadcrumbItem>
//         {/*  */}
//         <BreadcrumbSeparator />
//         <BreadcrumbItem>
//           <BreadcrumbLink asChild>
//             <Link href={`/dashboard/collages/${collageId}/news`}>الأخبار</Link>
//           </BreadcrumbLink>
//         </BreadcrumbItem>
//         <BreadcrumbSeparator />
//         <BreadcrumbItem>
//           <BreadcrumbPage>جديد</BreadcrumbPage>
//         </BreadcrumbItem>
//       </BreadcrumbList>
//     </Breadcrumb>
//   );
// };

export default page;
