"use client"
import { UpdateUserRole } from "@/action"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import { User } from "@prisma/client"
import { Edit3 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function EditUserRole({ user }: { user: User }) {
    const userRole = ["USER", "EDITOR", "ADVERTIZER"].filter(role => role !== user.role)
    const [chancgedRole, setRole] = useState<string>("")
    const [open, setOpen] = useState(false)
    const handleUpdateUser = async () => {
        try {
            const res = await UpdateUserRole(user.id, chancgedRole)
            toast.success("User role updated for" + res.email)
            setOpen(false)
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    return (

        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button disabled={user.role === "OWNER"} variant="outline"><Edit3 /></Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>{user.email}</DrawerTitle>
                        <DrawerDescription>Change {user.name}&apos;s role to </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex items-center  justify-between space-x-2">
                            {userRole.map((role) => (
                                <div key={role} className="flex w-full gap-2 justify-center  items-center">
                                    <input type="radio" id={role} checked={chancgedRole === role} onClick={() => setRole(role)} />
                                    <Label htmlFor={role}>{role}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <DrawerFooter>
                        <Button disabled={chancgedRole === ""} onClick={handleUpdateUser}>Change Role</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer >
    )
}
