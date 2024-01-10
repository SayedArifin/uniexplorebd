
"use client"
import { CgProfile } from "react-icons/cg";
import { Button } from "@nextui-org/button";
import { signIn, useSession } from "next-auth/react";
import { AiOutlineGoogle } from "react-icons/ai";
import Link from "next/link";


const SigninButton = () => {
    const { status } = useSession();
    return status === "authenticated" ? (

        <Link className="w-full justify-center text-white bg-primary hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2" href={"/profile"}><span className="mr-2"><CgProfile /></span>Profile</Link>

    ) : <Button isLoading={status === "loading"
    } onClick={() => signIn("google")} className="w-full bg-primary text-white" >
        <p className="flex justify-center items-center"><span className="mr-2"><AiOutlineGoogle /></span>Signin with Google</p>
    </Button >;
};

export default SigninButton;
