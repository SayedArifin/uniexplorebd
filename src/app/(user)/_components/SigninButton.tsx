
"use client"
import { CgProfile } from "react-icons/cg";
import { Button } from "@nextui-org/button";
import { signIn, useSession } from "next-auth/react";
import { AiOutlineGoogle } from "react-icons/ai";
import Link from "next/link";


const SigninButton = () => {
    const { status } = useSession();
    return status === "authenticated" ? (
        <Button className="w-full bg-primary">
            <Link href={"/profile"} className="flex justify-center items-center bg-primary text-white"><span className="mr-2"><CgProfile /></span>Profile</Link>
        </Button>
    ) : <Button isLoading={status === "loading"
    } onClick={() => signIn("google")} className="w-full bg-primary text-white" >
        <p className="flex justify-center items-center"><span className="mr-2"><AiOutlineGoogle /></span>Signin with Google</p>
    </Button >;
};

export default SigninButton;
