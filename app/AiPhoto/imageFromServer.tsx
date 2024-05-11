import Image from "next/image";
import React from "react";
import {cookies} from "next/headers";

export default function ImageFromServer() {

    let imageUrl = '';
    const imgCookie = cookies().get('image');
    if (imgCookie) {
        const {imageURL} = JSON.parse(imgCookie.value);
        imageUrl=imageURL;
    }
    return (
        <Image className='bg-gray-500 relative left-16 flex self-center shadow-2xl rounded-2xl'
               width='720' height='720' src={imageUrl} alt='Your image will appear here : )' priority/>
    )
}