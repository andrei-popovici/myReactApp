'use client';
import {useState} from "react";
import pb from "@/app/lib/pocketbase"


export default function SignUp(){
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    async function signUpUser(e:any) {
        e.preventDefault();

        const data = {
            'username': username,
            'password': password,
            'passwordConfirm': password,
        };

        const record = await pb.collection('users').create(data);
    }

    return(
        <div className='relative top-4 flex flex-col gap-y-4 self-center max-h-screen w-screen'>
            <form onSubmit={signUpUser} className='prompt'>
                <h1 className='text-center text-xl font-extrabold'>SignUp</h1>
                <input className='shadow-gray-700 focus:outline-none p-2 bg-gray-600 rounded-xl text-gray-100'
                       value={username} onChange={(e) => setUserName(e.target.value)}/>
                <input type='password' className='h-10 indent-2 focus:outline-none rounded-xl bg-gray-400'
                       value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit"
                        className=' relative top-0.5 min-w-min px-1.5 bg-gray-600 rounded self-center text-white hover:bg-gray-500'>Done
                </button>
            </form>
        </div>
    );
}