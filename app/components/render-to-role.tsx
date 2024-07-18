import { getSession } from "@/lib/auth";
import React from "react";

interface Props {
    appliedRole: "admin" | "teacher" | "student" | "superAdmin" | null | undefined;
    children: React.ReactNode
}

const RenderToRole = async ({ children, appliedRole }: Props) => {
    const currnetUser = await getSession();
    if (!currnetUser) return <></>;
    if (currnetUser.role === appliedRole) {
        return <>{children}</>
    } else {
        return <></>
    }
}
export default RenderToRole;

export const DontRenderUnlessSessionIsDefined = async ({ children }: { children: React.ReactNode }): Promise<React.JSX.Element> => {
    const currnetUser = await getSession();
    console.log(currnetUser)
    if (!currnetUser) return <>{children}</>
    return <>

    </>
}