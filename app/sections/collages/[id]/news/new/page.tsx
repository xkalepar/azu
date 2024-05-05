import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Link } from "lucide-react";
import { NewsForm } from "../../components/forms";

const page = async ({ params }: { params: { id: string } }) => {
  return (
    <section>
      <Breadcrumbs title={params.id ?? ""} />
      <NewsForm collageId={params.id} />
    </section>
  );
};
const Breadcrumbs = ({ title }: { title?: string }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {/* <Link href="/">الرئيسية</Link> */}
          <BreadcrumbLink asChild>
            {/* الرئيسية */}
            <Link href="/">الرئيسية</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">لوحة التحكم</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard/collages">الكليات</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{title ?? ".."}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
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
