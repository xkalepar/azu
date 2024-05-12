import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ReactNode } from "react";
import AnimatedCard from "./animated-card";

type props = {
  children?: React.ReactNode;
};

const Statiscs = ({ children }: props) => {
  return (
    <div className="grid md:grid-col-2 sm:grid-cols-3 lg:grid-cols-4">
      <AnimatedCard XorY="x" intialX={10}>
        <StatiscItem title="الكليات" content="19" />
      </AnimatedCard>
      <AnimatedCard XorY="x" intialX={20}>
        <StatiscItem title="الأقسام العلمية" content="95" />
      </AnimatedCard>
      <AnimatedCard XorY="x" intialX={30}>
        <StatiscItem title="الطلاب الوطنيون" content="95" />
      </AnimatedCard>
      <AnimatedCard XorY="x" intialX={40}>
        <StatiscItem title="الطلاب الأجانب" content="61" />
      </AnimatedCard>
      <AnimatedCard XorY="x" intialX={50}>
        <StatiscItem title="طلاب الدراسات العلمية" content="724" />
      </AnimatedCard>
      <AnimatedCard XorY="x" intialX={60}>
        <StatiscItem title="الكادر الأكاديمي" content="1030" />
      </AnimatedCard>
      <AnimatedCard XorY="x" intialX={70}>
        <StatiscItem title="الموظفون" content="1883" />
      </AnimatedCard>
      <AnimatedCard XorY="x" intialX={80}>
        <StatiscItem title="المدرجات" content="6" />
      </AnimatedCard>
      <AnimatedCard XorY="x" intialX={90}>
        <StatiscItem title="المكتبات" content="1" />
      </AnimatedCard>
      <AnimatedCard XorY="x" intialX={100}>
        <StatiscItem title="المجلات العلمية" content="412" />
      </AnimatedCard>
    </div>
  );
};

type itemProps = {
  title: string;
  content: string;
  children?: ReactNode;
};
const StatiscItem = ({ title, content, children }: itemProps) => {
  return (
    <div className="text-center transition-all hover:scale-105 rounded-md group mx-4 shadow-sm bg-card m-2 px-8 py-4 gap-2 md:gap-3 lg:gap-5">
      {children}
      <div className=" transition-all group-hover:text-primary text-xl">
        {title}
      </div>
      <div className="group-hover:text-primary transition-all">{content}</div>
    </div>
  );
};

export default Statiscs;
