"use client"
import { Dialog, DialogDescription } from "@/components/ui/dialog";
import { DeleteUserForm } from "./forms"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { TrashIcon } from "@radix-ui/react-icons";

type UserProp = {
    fullName: string;
    phone: number;
    collageId: string | null;
    id: string;
}
type CollagesProp = {
    title?: string;
    id: string
}

export default function UsersTable({ users, collages }: { users: UserProp[], collages: CollagesProp[] }) {
    return (
        <Table dir="rtl" className=" text-right ">
            {/* <TableCaption>قائمة باسماء المشرفين</TableCaption> */}
            <TableHeader dir="rtl" className=" text-center">
                <TableRow dir="rtl">
                    <TableHead dir="rtl">الاسم</TableHead>
                    <TableHead>الرقم</TableHead>
                    <TableHead>الكلية</TableHead>
                    <TableHead>الأحداث</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user, index) => (
                    <TableRow key={index}>
                        <TableCell>{user.fullName}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{PasrseCollageName({ collages, user })}</TableCell>
                        <TableCell>

                            <Dialog>
                                <DialogTrigger>
                                    <TrashIcon />
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogDescription>
                                        هل أنت متأكد من حذف {user.fullName}
                                    </DialogDescription>
                                    <DeleteUserForm userId={user.id} />
                                </DialogContent>
                            </Dialog>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>العدد الكلي</TableCell>
                    <TableCell className="text-right"> {users.length} مشرف  </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}


function PasrseCollageName({ collages, user }: { collages: { title?: string, id: string }[], user: UserProp }): string {
    let collageTitle = undefined;
    for (let collage of collages) {
        if (collage.id === user.collageId) {
            collageTitle = collage.title
        }
    }

    return collageTitle ?? ""
}