import React, {Suspense} from 'react';
import ImageFromServer from "@/app/AiPhoto/imageFromServer";
import {cookies} from "next/headers";
import PromptAi from "@/app/AiPhoto/PromptAi";
import {redirect} from "next/navigation";

export default function AiPhotoPage() {

    const usrCookie = cookies().get('pb_auth');
    let id = '';
    // if (!cookie) throw new Error('Not logged in');
    if (usrCookie) {
        const {model} = JSON.parse(usrCookie.value);
        id = model.username;
    } else {
        console.log("User not found");
        redirect('/');
    }
    const imgCookie = cookies().get('image');
    return (
        <div className='relative h-screen bg-gray-800 '>
            <div className='relative top-20 flex flex-col gap-y-8 self-center max-h-screen w-screen'>
                {!imgCookie
                    ? <div className='relative top-20 flex flex-col gap-y-8 self-center max-h-screen w-screen'>
                        <div className='size-40 gap-y-4 self-center '></div>
                        <h1 className='text-6xl text-center ml-36 font-bold text-gray-50'>Ai Generation Tool</h1>
                        <div className='size-20 gap-y-4 self-center '></div>
                        <PromptAi/>
                    </div> :
                    <div className='relative top-18 flex flex-col gap-y-8 self-center max-h-screen w-screen'>
                        <h1 className='text-6xl text-center ml-36 font-bold text-gray-50'>Ai Generation Tool</h1>
                        <ImageFromServer/>
                        <PromptAi/>
                    </div>
                }
            </div>

        </div>
    );
}
