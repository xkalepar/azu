import LoginForm from "@/app/components/login-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "تسجيل الدخول جامعة الزيتونة",
};

const page = ({ params }: { params: { lang: "ar" | "en" } }) => {
  const lang = params.lang;
  return (
    <main className=" h-screen w-full flex-center">
      <div className="border px-16 md:w-1/4 w-[90%] shadow-xl py-[80px] rounded-lg flex flex-col bg-secondary">
        <h1 className="font-bold text-xl my-4">
          تسجيل الدخول
        </h1>
        <LoginForm className="w-full" lang={lang} />
      </div>
    </main>
  );
};

export default page;
