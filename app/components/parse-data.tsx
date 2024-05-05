import { cn } from "@/lib/utils";

interface Props {
  content: string;
  className?: string;
  dir?: string;
}

const ParseData = ({ content, className, dir = "rtl" }: Props) => {
  return (
    <div
      dir={dir}
      className={cn("ProseMirror rounded-lg", className)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default ParseData;
