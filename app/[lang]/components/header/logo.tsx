import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

type LogoProps = {
  href?: string;
  src?: string;
};
const Logo = ({ href, src }: LogoProps) => {
  return (
    <Link href={href ?? "/"}>
      <Avatar>
        <AvatarFallback>Logo</AvatarFallback>
        <AvatarImage src={src}></AvatarImage>
      </Avatar>
    </Link>
  );
};

export default Logo;
