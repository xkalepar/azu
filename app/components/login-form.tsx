"use client";
import React from "react";
import Form from "./form";
import SubmitButton from "./custom-sumbit-btn";
import { signIn } from "@/lib/auth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Lang from "../[lang]/components/lang";

const LoginForm = ({
  className,
  lang,
}: {
  className?: string;
  lang: "ar" | "en";
}) => {
  return (
    <Form className={className} action={signIn}>
      <Label htmlFor="username">
        <Lang ar={"اسم المستخدم"} en={"username"} lang={lang} />
      </Label>
      <Input type={"text"} name="username" id="username" required className="bg-white" />

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
