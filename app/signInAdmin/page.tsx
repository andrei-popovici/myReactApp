import {loginAdmin} from "@/app/actions";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default async function signInPage() {
    const cookie = cookies().get('pb_admin');
    // This never happens because of the middleware,
    // but we must make typescript happy
    if (!cookie){
        console.log("No admin");
    }else{
        redirect(`/adminPage`);
    }
    return (
        <div className='relative flex flex-col gap-y-4 h-screen self-center w-screen bg-secondary overflow-hidden'>
            <form action={loginAdmin} className='prompt mt-28'>
                <h2 className='text-center text-xl font-extrabold top-32'>Sign In As Admin</h2>
                <input placeholder='Email' name='username' type='text'
                       className='focus:outline-none p-2 bg-gray-600 rounded-xl text-gray-100'
                />
                <input placeholder='Password' type='password' name='password'
                       className='h-10 indent-2 focus:outline-none rounded-xl bg-gray-200'
                />
                <button type="submit"
                        className=' relative top-0.5 min-w-min px-1.5 bg-gray-600 rounded self-center text-white hover:bg-gray-500'>Done
                </button>
            </form>
        </div>
    )
}