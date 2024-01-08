"use client"
import { CgProfile } from "react-icons/cg";
import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineGoogle } from "react-icons/ai";
import Link from "next/link";
import { useEffect, useState } from "react";

import { userRole } from "@/action";

const SigninButton = () => {
    const { status, data } = useSession();
    const [role, setRole] = useState<string | undefined>();
    useEffect(() => {
        if (data) {
            const fetchData = async () => {
                const role = await userRole(data.user?.email);
                setRole(role);
            }
            fetchData();
        }
    }, [data]);

    return status === "authenticated" ? (
        <>
            <button className="w-full">
                <Link href={"/profile"} className="flex justify-center items-center">
                    <span className="mr-2">
                        <CgProfile />
                    </span>
                    Profile
                </Link>
                <button onClick={() => signOut()}>Logout</button>
            </button>
            {role === "EDITOR" && <button><Link href={"/editor"}>editor dashboard</Link></button>}
            {role === "ADVERTIZER" && <button><Link href={"/advertizer"}>Advertizer</Link></button>}
            {role === "OWNER" && <button><Link href={"/owner"}>owner</Link></button>}
        </>
    ) : (
        <button onClick={() => signIn("google")} className="w-full">
            <div className="flex justify-center items-center">
                <span className="mr-2">
                    <AiOutlineGoogle />
                </span>
                Sign in with Google
            </div>
        </button>
    );

};

export default SigninButton;
