'use client';
import {useForm} from "react-hook-form";
import pb from "@/app/lib/pocketbase"
import {useContext, useEffect, useState} from "react";
import {randomInt} from "node:crypto";
import UserContext from "@/app/userContext"

export default function SignIn() {

    const {register, handleSubmit, reset} = useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [dummy, setDummy] = useState(0);
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        // Check if the user is already logged in from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(storedUser);
            setIsLogged(true);
        }
    }, []);

    async function signInUser(data: any) {
        setIsLoading(true);
        try {
            const authData = await pb.collection('users').authWithPassword(
                data.username,
                data.password,
            );
            setIsLogged(true);
            setUser(pb.authStore.model?.id);
            // Store user in localStorage to stay signed in
            localStorage.setItem('user', pb.authStore.model?.id);
            document.cookie = "yourCookie=${pb.authStore.model?.id};path=/;"
            setIsLoading(false);
            console.log(user);
            console.log(pb.authStore.model?.id);
        } catch (ClientResponseError) {
            alert("Try again : )");
            setIsLoading(false);
        }
        reset();
    }

    function logout() {
        // Remove user from localStorage
        localStorage.removeItem('user');
        setUser('');
        setIsLogged(false)
        setDummy(randomInt);
    }

    return (
        <div
            className='relative flex flex-col gap-y-4 h-screen self-center w-screen bg-secondary overflow-hidden'>

            {isLoading &&
                <h1 className='relative left-24'> Loading...</h1>
            }

            {isLogged &&
                <>
                    <h1 className='text-8xl text-center mt-36  ml-36 font-bold text-gray-800 '>
                        Hello, {pb.authStore.model?.username}!
                    </h1>
                    <button type='button' onClick={logout}
                            className=' relative top-32 min-w-min size-40 scale-150 px-1.5 left-16 bg-gray-600 rounded-xl
                            self-center text-white hover:bg-gray-500 hover:rounded-3xl transition-all duration-100 ease-linear'>Log
                        Out
                    </button>
                </>
            }
            {!isLogged &&
                <h1 className='text-6xl text-center mt-52 ml-56 font-bold text-gray-50'>Welcome Back</h1>
            }
            {!isLogged &&
                <form onSubmit={handleSubmit(signInUser)} className='prompt mt-28'>
                    <h2 className='text-center text-xl font-extrabold top-32'>Sign In</h2>
                    <input placeholder='Username'
                           className='focus:outline-none p-2 bg-gray-600 rounded-xl text-gray-100'
                           {...register('username')}/>
                    <input placeholder='Password' type='password'
                           className='h-10 indent-2 focus:outline-none rounded-xl bg-gray-200'
                           {...register('password')}/>
                    <button type="submit"
                            className=' relative top-0.5 min-w-min px-1.5 bg-gray-600 rounded self-center text-white hover:bg-gray-500'>Done
                    </button>
                </form>
            }
        </div>

    );
}
