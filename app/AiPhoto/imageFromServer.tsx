import Image from "next/image";
import React from "react";

export default function ImageFromServer(props: { image: string }) {
    return (
        <Image className='bg-gray-500 relative left-16 flex self-center shadow-2xl rounded-2xl'
               width='720' height='720' src={props.image} alt='image' priority/>
    )
}