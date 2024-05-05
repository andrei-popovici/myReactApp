'use client';
import React, { useContext, ReactElement, ReactNode } from "react";
import UserContext from "@/app/userContext";

export default function GetUser({ children }: { children: React.ReactNode; }) {
    const [storedUser, setStoredUser] = useContext(UserContext);


    return (
        // Render children with storedUser as props
        <>

        </>
    );
}
