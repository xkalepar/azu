import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Link } from "lucide-react";
import { NewDataForm } from "../components/forms";

const page = async ({ params }: { params: { id: string } }) => {
  return (
    <section>
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
            <BreadcrumbPage>{"جديد"}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <NewDataForm collageId={params.id} />
    </section>
  );
};


export default page;
