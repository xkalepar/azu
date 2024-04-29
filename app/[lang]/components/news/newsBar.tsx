"use client";

import { Button } from "@/components/ui/button";
import { Fragment, useState } from "react";
import { FaXmark } from "react-icons/fa6";

interface NewsBarProps {
  news: string[];
}

const NewsBar: React.FC<NewsBarProps> = ({ news }) => {
  const [visible, setVisible] = useState<Boolean>(true);
  return (
    <Fragment>
      {visible && (
        <div className={"flex my-2"}>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
            consectetur ullam, placeat ab quasi molestiae impedit doloribus
            ducimus laborum eaque modi facere nisi, quas quidem eveniet suscipit
            at temporibus. Ipsa.
          </p>
          <Button
            onClick={() => setVisible(!visible)}
            variant={"ghost"}
            size={"icon"}
          >
            <FaXmark />
          </Button>
        </div>
      )}
    </Fragment>
  );
};

export default NewsBar;
