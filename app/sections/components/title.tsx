import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";

type Props = {
  title: string;
  className?: string;
  children?: React.ReactNode;
  avatar?: string;
  separator?: boolean;
};
const Title = ({
  title,
  className,
  children,
  avatar,
  separator = true,
}: Props) => {
  return (
    <header>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {avatar && (
            <Avatar>
              <AvatarFallback>LO</AvatarFallback>
              <AvatarImage src={avatar} />
            </Avatar>
          )}
          <h1 className={cn("", className)}>{title}</h1>
        </div>{" "}
        <div className="">
          <Button variant={"ghost"} size={"icon"}>
            <CiSettings size={24} />
          </Button>
          <Button variant={"ghost"} size={"icon"}>
            <CgProfile size={22} />
          </Button>
        </div>
      </div>
      {separator && <Separator className="mt-4" />} {children}
    </header>
  );
};

export default Title;
