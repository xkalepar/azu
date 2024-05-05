import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  type?: "submit" | "reset" | "button" | undefined;
}

export default function SubmitButton({
  children,
  className,
  size,
  variant,
  type,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      className={className}
      size={size}
      variant={variant}
      type={type}
      aria-disabled={pending}
    >
      {pending ? <ReloadIcon className="spin-animation" /> : children}
    </Button>
  );
}
