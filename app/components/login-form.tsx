"use client";
import React from "react";
import Form from "./form";
import SubmitButton from "./custom-sumbit-btn";
import { signIn } from "@/lib/auth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Lang from "../[lang]/components/lang";
import { useParams } from "next/navigation";
import InputValidator from "../[lang]/components/phone-input";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const LoginForm = ({ className }: { className?: string }) => {
  const { lang }: { lang: Locale } = useParams();
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  return (
    <Form
      className={className}
      replaceLink={`/${lang}/`}
      sucess="تم تسجيل الدخول بنجاح"
      action={signIn}
    >
      <Label htmlFor="phone">
        <Lang ar={"رقم الهاتف"} en={"phone number"} lang={lang} />
      </Label>
      <InputValidator
        type={"tel"}
        name="phone"
        id="phone"
        dir="rtl"
        placeholder={lang === "ar" ? "رقم الهاتف" : "phone number"}
        required
        className="bg-white"
      />

      <div className="md:max-w-sm  mx-auto">
        <Label htmlFor="pass" className="text-sm font-normal">
          <Lang ar={"كلمة المرور"} en={"password"} lang={lang} />
        </Label>
        <div className="relative my-1">
          <Input
            type={isVisible ? "text" : "password"}
            id="pass"
            required
            name="password"
            placeholder={lang === "ar" ? "كلمة المرور" : "password"}
            className="py-2 border-2 "
          />
          <div
            className={cn(
              "absolute top-2 text-2xl text-gray-500 cursor-pointer",
              lang === "ar" ? "left-4" : "right-4 "
            )}
            onClick={() => setIsVisible((prev) => !prev)}
          >
            {isVisible ? <Eye size={22} /> : <EyeOff size={22} />}
          </div>
        </div>
      </div>

      <SubmitButton className="w-full mt-4">
        <Lang ar={"تسجيل الدخول"} en={"sign in"} lang={lang} />
      </SubmitButton>
    </Form>
  );
};

export default LoginForm;
