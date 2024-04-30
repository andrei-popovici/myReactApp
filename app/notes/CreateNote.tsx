'use client';

import pb from "@/app/lib/pocketbase"
import {useContext, useState} from "react";
import {useRouter} from "next/navigation";
import UserContext from "@/app/userContext"



export default function CreateNote(){
    const [title,setTitle,] = useState("");
    const [content, setContent] = useState("");

    const router = useRouter();
    const [user,_] = useContext(UserContext);
    const create = async()=> {
        // await fetch('http://127.0.0.1:8090/api/collections/notes/records', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         title,
        //         content,
        //     })
        // });
        // setTitle('');
        // setContent('');
        // router.refresh();
        await pb.collection('notes').create({"title":title,"content":content,"user":user});
        setTitle('');
        setContent('');
        router.refresh();
    }

    return(
        <form onSubmit={create} className='prompt'>
            <h1 className='text-center text-xl font-extrabold'>Add Note</h1>
            <input className='shadow-gray-700 focus:outline-none p-2 bg-gray-600 rounded-xl text-gray-100' value={title} onChange={(e) => setTitle(e.target.value)}/>
            <textarea className=' indent-2 focus:outline-none rounded-xl bg-gray-400' value={content} onChange={(e) => setContent(e.target.value)}/>
            <button type="submit" className=' relative top-0.5 min-w-min px-1.5 bg-gray-600 rounded self-center text-white hover:bg-gray-500'>Add</button>
        </form>
    )
}