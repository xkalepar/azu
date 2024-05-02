import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";

type Props = {
  title: string;
  className?: string;
  children?: React.ReactNode;
};
const Title = ({ title, className, children }: Props) => {
  return (
    <header>
      <div className="flex justify-between items-center">
        <h1 className={cn("", className)}>{title}</h1>
        <div className="">
          <Button variant={"ghost"} size={"icon"}>
            <CiSettings size={24} />
          </Button>
          <Button variant={"ghost"} size={"icon"}>
            <CgProfile size={22} />
          </Button>
        </div>
      </div>
      <Separator className="mt-4" />
      {children}
    </header>
  );
};

export default Title;
