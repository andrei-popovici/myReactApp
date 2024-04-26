import "./globals.css";
import React from "react";
import SideBar from "@/app/SideBar";
import Home from '@/app/page'

export default function RootLayout({children,}:{ children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body>
      <main>
          {children}
          <SideBar/>
      </main>
      </body>
    </html>
  );
}
