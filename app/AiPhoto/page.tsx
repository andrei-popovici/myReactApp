'use client';
import {Suspense, useState} from "react";
import React from 'react';
import Loading from "@/app/loading";
import {addImageToDb, getImageURL} from "@/app/AiPhoto/imageHandling";
import ImageFromServer from "@/app/AiPhoto/imageFromServer";

export default function AiPhotoPage() {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const createImage = async (e: any) => {
        e.preventDefault(); // Prevent default form submission

        const storedUser = localStorage.getItem('user');

        if (!storedUser) {
            alert('User not logged in');
            return;
        }

        setIsLoading(true);
        console.log(`Creating image... ${prompt}`);

        const imageURL = await getImageURL(prompt);

        setImage(imageURL);
        setIsLoading(false);
        setPrompt('');

        await addImageToDb(imageURL, storedUser);
    };

    return (
        <div className='h-screen bg-gray-800 '>
            <div className='relative top-4 flex flex-col gap-y-4 self-center max-h-screen w-screen'>
                {/*{!image*/}
                {/*    ? <>*/}
                {/*        <div className='size-40 gap-y-4 self-center '></div>*/}
                {/*        <h1 className='text-6xl text-center ml-36 font-bold text-gray-50'>Ai Generation Tool</h1>*/}
                {/*        <div className='size-20 gap-y-4 self-center '></div>*/}
                {/*    </>*/}
                {/*    : <>*/}
                        <Suspense fallback={<Loading/>}>
                            <h1 className='text-4xl text-center mt-24 ml-36 font-bold text-gray-50'>Ai Generation Tool</h1>
                            <ImageFromServer image={image}/>
                        </Suspense>
                    {/*</>}*/}
                <form className='prompt left-16 bg-secondary border-2 border-gray-400 h-32 gap-y-1'
                      onSubmit={createImage}>
                    <label className='text-center text-xl font-extrabold text-gray-950'>Prompt</label>
                    <textarea className='indent-2 rounded-xl text-gray-950 focus:outline-none' value={prompt}
                              onChange={(e) => setPrompt(e.target.value)}></textarea>
                    <button className='relative shadow-2xl top-1 p-0.5 min-w-min px-1.5 bg-white rounded self-center
                            text-gray-700 hover:bg-gray-800 hover:text-white transition-all duration-200 ease-linear hover'
                            type="submit">
                        Put it in the oven ⏲️
                    </button>
                </form>
            </div>
        </div>
    );
}
