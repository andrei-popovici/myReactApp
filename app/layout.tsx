'use client';
import "./globals.css";
import React, {useState} from "react";
import SideBar from "@/app/SideBar";
import userContext from "@/app/userContext";

export default function RootLayout({children,}: { children: React.ReactNode; }) {
    const [user, setUser] = useState('');

    return (
        <userContext.Provider value={[user, setUser]}>
            <html lang="en">
            <body>
            <main>
                {children}
                <SideBar/>
            </main>
            </body>
            </html>
        </userContext.Provider>
    );
}
