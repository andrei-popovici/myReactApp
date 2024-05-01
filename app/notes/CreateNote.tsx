'use client';
import pb from "@/app/lib/pocketbase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateNote() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();

    const create = async () => {
        // Check if the user is already logged in from localStorage
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            alert('User not logged in');
            return;
        }

        await pb.collection('notes').create({ "title": title, "content": content, "user": storedUser });
        setTitle('');
        setContent('');
        router.refresh();
    };

    return (
        <form onSubmit={create} className='prompt'>
            <h1 className='text-center text-xl font-extrabold'>Add Note</h1>
            <input className='shadow-gray-700 focus:outline-none p-2 bg-gray-600 rounded-xl text-gray-100' value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea className='indent-2 focus:outline-none rounded-xl bg-gray-400' value={content} onChange={(e) => setContent(e.target.value)} />
            <button type="submit" className='relative top-0.5 min-w-min px-1.5 bg-gray-600 rounded self-center text-white hover:bg-gray-500'>Add</button>
        </form>
    );
}


