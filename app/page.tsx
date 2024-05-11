import React, {useContext} from "react";
import Link from "next/link";
import {cookies} from "next/headers";

export default function Home() {

    const cookie = cookies().get('pb_auth');
    let name = '';
    // if (!cookie) throw new Error('Not logged in');
    if (cookie) {
        const {model} = JSON.parse(cookie.value);
        name = model.username;
    }

    return (
        <div className="relative bg-gray-800 h-screen flex flex-wrap flex-col items-center gap-y-4 overflow-hidden">
            <h1 className='relative text-secondary font-extrabold text-9xl top-40 left-10  text-center'>
                Ce poti face cu react???
            </h1>
            {!cookie ? <>
                    <h2 className='relative text-gray-400 font-bold top-72'>Sign in and find out :)</h2>
                    <div className="relative flex top-80 gap-2  shadow-xl shadow-gray-600 bg-white w-auto h-auto p-2 rounded scale-150 hover:rounded-xl
          transition duration-400 ease-linear">
                        <Link href='./signIn' className='shadow-xl p-1 bg-secondary rounded justify-center hover:text-white
              hover:bg-gray-800 transition-all duration-100 ease-linear'>Sign In</Link>
                        <Link href='./signUp' className='shadow-xl p-1 bg-secondary rounded justify-center hover:text-white
              hover:bg-gray-800 transition-all duration-100 ease-linear'>Sign Up</Link>
                    </div>
                </> :
                <>
                    <h2 className='relative text-2xl left-14 text-gray-400 font-bold top-72'>Welcome back, {name}!!</h2>
                </>
            }
        </div>
    );
}
