import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type props = {
  children: React.ReactNode;
};

const Statiscs = ({ children }: props) => {
  return (
    <div>
      {children}

      <ScrollArea
        className="w-full transition-all h-22 flex rounded-md flex-row"
        dir="rtl"
      >
        <div className="flex w-max space-x-4 px-2 py-8  transition-all">
          <ScrollBar orientation="horizontal" className=" transition-all" />
          <StatiscItem title="الكليات" content="18" />
          <StatiscItem title="الأقسام العلمية" content="234" />
          <StatiscItem title="الطلاب الوطنيون" content="100" />
          <StatiscItem title="الطلاب الأجانب" content="42" />
          <StatiscItem title="طلاب الدراسات العلمية" content="100" />
          <StatiscItem title="الكادر الأكاديمي" content="144" />
          <StatiscItem title="الموظفون" content="18" />
          <StatiscItem title="المدرجات" content="42" />
          <StatiscItem title="المكتبات" content="33" />
          <StatiscItem title="المجلات العلمية" content="412" />
        </div>
      </ScrollArea>
    </div>
  );
};

type itemProps = {
  title: string;
  content: string;
};
const StatiscItem = ({ title, content }: itemProps) => {
  return (
    <div className=" text-center group mx-4">
      <div className=" transition-all group-hover:text-primary">{title}</div>
      <div className="group-hover:text-primary transition-all">{content}</div>
    </div>
  );
};

export default Statiscs;
