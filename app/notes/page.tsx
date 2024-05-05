'use client';
import CreateNote from "@/app/notes/CreateNote";
import {RefreshOnFocus} from "./refreshOnFocus";
import {getNotes, Note} from "./getNotes"
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

// this is needed beacause I don't use fetch, so I have to specify the caching method

export const dynamic = 'auto',
    dynamicParams = true

export default function NotesPage() {
    const [notes, setNotes] = useState<any[]>([]);
    const [user, setUser] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

            if (!storedUser) {
                console.error("User not logged in");
            }
            // Fetch notes associated with the current user
            getNotes(storedUser).then(data => {
                setNotes(data);
            }).catch(error => {
                console.error("Error fetching notes:", error);
            });
    }, []);

    try {
        return (
            <div className='flex flex-col gap-y-6 h-screen bg-secondary overflow-y-auto overflow-x-hidden '>
                <h1 className='relative mt-2 text-gray-950 text-5xl font-bold left-28'>Notes</h1>
                <div  className='notesPage'>
                    {notes?.map(note => {
                        return <Note key={note.id} note={note}/>;
                    })}
                </div>
                <CreateNote/>
            </div>
        );
    } catch (e) {
        console.error(e);
    }
}

