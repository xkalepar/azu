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

const LoginForm = ({ className }: { className?: string }) => {
  const { lang }: { lang: "en" | "ar" } = useParams();
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
        required
        className="bg-white"
      />

      <Label htmlFor="password">
        <Lang ar={"كلمة المرور"} en={"password"} lang={lang} />
      </Label>
      <Input
        className="mb-3 bg-white"
        type={"passwrod"}
        name="password"
        id="password"
        required
      />

      <SubmitButton>
        <Lang ar={"تسجيل الدخول"} en={"sign in"} lang={lang} />
      </SubmitButton>
    </Form>
  );
};

export default LoginForm;
