'use client';
import {useForm} from "react-hook-form";
import pb from "@/app/lib/pocketbase"
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function SignIn() {
    const {register, handleSubmit, reset} = useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    async function signUpUser(data: any) {
        const datA = {
            'username': data.username,
            'password': data.password,
             'passwordConfirm': data.password,
        };

        try {
            const record = await pb.collection('users').create(datA);
            if(record != null){
                router.replace('/signIn');
                return null;
            }

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            {isLoading &&
                <h1 className='relative left-24'> Loading...</h1>}
            <form onSubmit={handleSubmit(signUpUser)} className='prompt'>
                <h2 className='text-center text-xl font-extrabold'>Sign Up</h2>
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
        </>
    )

}