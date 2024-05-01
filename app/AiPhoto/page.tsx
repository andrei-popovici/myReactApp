'use client';
import {useState} from "react";
import Image from "next/image";
import React from 'react';
import Img from 'next/image'
import pb from "@/app/lib/pocketbase";

export default function AiPhotoPage() {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const createImage = async (e:any) => {
        e.preventDefault(); // Prevent default form submission
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            alert('User not logged in');
            return;
        }
        setIsLoading(true);
        console.log(`Creating image... ${prompt}`);

        const response = await fetch('http://localhost:8080/cook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt,
            }),
        });

        const {imageURL} = await response.json();
        setImage(imageURL);
        setIsLoading(false);
        setPrompt('');
        await pb.collection('photos').create({ "image": imageURL, "user": storedUser });
    };

    return (
        <div className='h-screen bg-gray-800 '>
            {isLoading ? (
                <div className='relative top-4 flex flex-col gap-y-4 self-center h-screen'>
                    <h1 className='text-4xl text-center mt-6 ml-36 font-bold text-gray-50'>Ai Generation Tool</h1>
                    <Img className='bg-gray-500 relative top-14 left-12 flex self-center shadow-2xl rounded-2xl'
                         width='720' height='720' src={require('./img.png')} alt='image'/>
                </div>
            ) : (
                <div className='relative top-4 flex flex-col gap-y-4 self-center max-h-screen w-screen'>
                    {!image && <div className='size-40 gap-y-4 self-center '></div>}
                    {!image &&
                        <h1 className='text-6xl text-center ml-36 font-bold text-gray-50'>Ai Generation Tool</h1>}
                    {image &&
                        <h1 className='text-4xl text-center ml-36 font-bold text-gray-50'>Ai Generation Tool</h1>}
                    {image &&
                        <Image className='bg-gray-500 relative left-16 flex self-center shadow-2xl rounded-2xl'
                               width='720' height='720' src={image} alt='image' priority/>}
                    {!image && <div className='size-20 gap-y-4 self-center '></div>}
                    <form className='prompt left-16 bg-secondary border-2 border-gray-400 h-32 gap-y-1'
                          onSubmit={createImage}>
                        <label className='text-center text-xl font-extrabold text-gray-950'>Prompt</label>
                        <textarea className='indent-2 rounded-xl text-gray-950 focus:outline-none' value={prompt}
                                  onChange={(e) => setPrompt(e.target.value)}></textarea>
                        <button className='relative shadow-2xl top-1 p-0.5 min-w-min px-1.5 bg-white rounded
                            self-center text-gray-700 hover:bg-gray-800 hover:text-white transition-all duration-200 ease-linear hover'
                                type="submit">
                            Put it in the oven ⏲️
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
