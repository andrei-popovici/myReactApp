import Link from "next/link";
import CreateNote from "@/app/notes/CreateNote";
import { RefreshOnFocus } from "./refreshOnFocus";
import pb from "@/app/lib/pocketbase"
import {useContext} from "react";
import UserContext from "@/app/userContext";

// this is needed beacause I don't use fetch, so I have to specify the caching method
export const dynamic = 'auto',
    dynamicParams = true,
    revalidate = 0,
    fetchCache = 'auto',
    runtime = 'nodejs',
    preferredRegion = 'auto'

async function getNotes() {
    // const res = await fetch('http://127.0.0.1:8090/api/collections/notes/records?page&perPage',
    //     {cache: "no-cache"});
    // const data = await res.json();
    try {
        const data = await pb.collection('notes').getList();
        return data?.items as any[];
    }catch(error){
        console.error("habar n am");
    }
}

export default async function NotesPage() {
    try{
    const notes = await getNotes();
    return (
        <div className='flex flex-col gap-y-6 h-screen bg-secondary overflow-y-auto overflow-x-hidden '>
            <h1 className='relative mt-2 text-gray-950 text-5xl font-bold left-28'>Notes</h1>
            <div className='notesPage'>
                {notes?.map(note => {
                    return <Note key={note.id} note={note}/>;
                })}
            </div>
            <CreateNote/>
            <RefreshOnFocus/>
        </div>
    );}catch(e){
        console.error(e);
    }
}

function Note({ note }: any) {
    const { id, title, content, created } = note || {};

    return (
        <Link href={`/notes/${id}`}>
            <div className='noteS'>
                <h2 className='text-xl font-bold'>{title}</h2>
                <h5>{content}</h5>
                <p>{created}</p>
            </div>
        </Link>
    );
}
