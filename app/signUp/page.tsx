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
         <div className='relative flex flex-col gap-y-4 h-screen self-center w-screen bg-secondary overflow-hidden'>
           {!isLoading &&
                <form onSubmit={handleSubmit(signUpUser)} className='prompt mt-36 border-2 border-gray-900'>
                    <h2 className='text-center text-xl font-extrabold top-32'>Sign Up</h2>
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
    )

}