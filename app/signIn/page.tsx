'use client';
import {useForm} from "react-hook-form";
import pb from "@/app/lib/pocketbase"
import {useContext, useState} from "react";
import {randomInt} from "node:crypto";
import UserContext from "@/app/userContext"

export default function SignIn() {
    const {register, handleSubmit, reset} = useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [dummy ,setDummy] = useState(0);
    const [user, setUser] = useContext(UserContext);

    async function signInUser(data: any) {
        setIsLoading(true);
        try {
            const authData = await pb.collection('users').authWithPassword(
                data.username,
                data.password,
            );
            setIsLogged(pb.authStore.isValid);
            setUser(pb.authStore.model?.id);
            setIsLoading(false);
        } catch (ClientResponseError) {
            alert("Try again : )");
            setIsLoading(false);
        }
        reset();
    }

    function logout() {
        pb.authStore.clear();
        setIsLogged(false)
        setDummy(randomInt);
    }

    return (
        <div className='relative top-4 flex flex-col gap-y-4 self-center max-h-screen w-screen'>

            {isLoading &&
                <h1 className='relative left-24'> Loading...</h1>
            }

            <h1 className='relative left-24 text-gray-800'>Is signed in {isLogged.toString()}</h1>

            {isLogged &&
                <>
                    <h1 className='text-4xl text-center mt-6 ml-36 font-bold text-gray-800 '>
                        Hello, {pb.authStore.model?.username}!
                    </h1>
                    <button type='button' onClick={logout}
                            className=' relative top-0.5 min-w-min px-1.5 bg-gray-600 rounded self-center text-white hover:bg-gray-500'>Done
                    </button>
                </>

            }
            {!isLogged &&
                <form onSubmit={handleSubmit(signInUser)} className='prompt'>
                    <h2 className='text-center text-xl font-extrabold'>Sign In</h2>
                    <input placeholder='Username'
                           className='shadow-gray-700 focus:outline-none p-2 bg-gray-600 rounded-xl text-gray-100'
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
