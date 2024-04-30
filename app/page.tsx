import React from "react";
import Link from "next/link";
import pb from "@/app/lib/pocketbase";

export default function Home() {
  return (
      <div className="bg-gray-800 h-screen flex flex-wrap">
          <h1 className='relative top-20 left-60 text-secondary font-extrabold size-40 text-9xl text-justify'>
              Ce e react??
          </h1>
          <Link href='/signIn'>Sign In</Link>
          <Link href='/signUp'>Sign Up</Link>
      </div>
  );
}
