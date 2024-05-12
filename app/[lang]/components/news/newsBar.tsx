"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Fragment, useState } from "react";
import { FaXmark } from "react-icons/fa6";

interface NewsBarProps {
  content: string;
  className?: string;
  showCloseBtn?: boolean;
}

const NewsBar: React.FC<NewsBarProps> = ({
  content,
  className,
  showCloseBtn = false,
}) => {
  const [visible, setVisible] = useState<Boolean>(true);
  return (
    <Fragment>
      {visible && (
        <div
          className={cn(
            "flex gap-2 justify-start my-2 bg-secondary px-4 py-1 rounded-md relative",
            className
          )}
        >
          <div className="bg-primary absolute top-0 opacity-70 text-primary z-50 w-1 rounded-r-md right-0 h-full" />
          <Button variant={"ghost"} size={"icon"} disabled>
            <InfoCircledIcon className=" text-primary" />
          </Button>
          <p className="flex-1">{content}</p>
          {showCloseBtn && (
            <Button
              className=" hover:text-red-500"
              onClick={() => setVisible(!visible)}
              variant={"ghost"}
              size={"icon"}
            >
              <FaXmark />
            </Button>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default NewsBar;
