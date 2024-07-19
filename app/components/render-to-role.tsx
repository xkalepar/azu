import { getSession } from "@/lib/auth";
import { Role } from "@prisma/client";
import React from "react";

interface Props {
    appliedRole:
    | "admin"
    | "teacher"
    | "student"
    | "superAdmin"
    | null
    | undefined;
    children: React.ReactNode;
    currnetUser: {
        fullName: string;
        id: string;
        phone: number;
        role: Role;
    } | null;
}

const RenderToRole = async ({ children, appliedRole, currnetUser }: Props) => {
    if (!currnetUser) return <></>;
    if (currnetUser.role === appliedRole) {
        return <>{children}</>;
    } else {
        return <></>;
    }
};
export default RenderToRole;

export const DontRenderUnlessSessionIsDefined = async ({
    children,
    currnetUser,
}: {
    children: React.ReactNode;
    currnetUser: {
        fullName: string;
        id: string;
        phone: number;
        role: Role;
    } | null;
}): Promise<React.JSX.Element> => {
    if (!currnetUser) return <>{children}</>;
    return <></>;
};
