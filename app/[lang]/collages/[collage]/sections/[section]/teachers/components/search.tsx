"use client";
import React from "react";
import { useSearchParams, usePathname, useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";

const SearchForm = ({ placeholder }: { placeholder: string }) => {
    const { lang } = useParams()
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 100);
    return (
        <div className="w-full sm:w-1/2 my-2" dir={lang === "ar" ? "rtl" : "ltr"}>
            <Input
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get("query")?.toString()}
                type={"text"}
            />
        </div>
    );
};

export default SearchForm;