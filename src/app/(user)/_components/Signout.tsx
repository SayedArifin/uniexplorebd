"use client"

import { Button } from "@nextui-org/button";
import { signOut } from "next-auth/react";
const Signout = () => {
    return <Button variant="solid" color="danger" onClick={() => signOut()}>Logout</Button>;
};

export default Signout;