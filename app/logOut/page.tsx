import pb from "@/app/lib/pocketbase";
import {logout} from "@/app/actions";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default function Page() {
    const cookie = cookies().get('pb_auth');

    // This never happens because of the middleware,
    // but we must make typescript happy
    if (!cookie) {

        console.log("User not found");
        redirect('/');
    }

    const {model} = JSON.parse(cookie.value);

    return (
        <div className='relative flex flex-col gap-y-4 h-screen self-center w-screen bg-secondary overflow-hidden'>
            <h1 className='text-8xl text-center mt-36  ml-36 font-bold text-gray-800 '>
                Hello, {model.username}!
            </h1>
            <form action={logout} className='relative self-center'>
                <button type='submit'
                        className=' relative top-32 min-w-min size-40 scale-150 px-1.5 left-16 bg-gray-600 rounded-xl
                           self-center text-white hover:bg-gray-500 hover:rounded-3xl transition-all duration-100 ease-linear'>
                    Log Out
                </button>
            </form>

        </div>
    )
}