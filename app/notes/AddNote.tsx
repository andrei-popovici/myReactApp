'use client';
import {useFormState, useFormStatus} from "react-dom";
import {createNote} from "@/app/notes/CreateNote";
import {useContext, useEffect} from "react";
import {useRouter} from "next/navigation";
import UserContext from "@/app/userContext";

const initialState = {
    message:'',
}

function SubmitButton() {
    const {pending} = useFormStatus();

    return (
        <button type="submit" aria-disabled={pending} className='relative top-0.5 min-w-min px-1.5 bg-gray-600
        rounded self-center text-white hover:bg-gray-500'>{
            pending? 'Loading...' : 'Add'
        }
        </button>
    );
}

export function AddNote() {
    const [state, formAction] = useFormState(createNote, initialState);
    const [userId,setUser] = useContext(UserContext);
    return (
        <>
            <form action={formAction} className='prompt'>
                <h1 className='text-center text-xl font-extrabold'>Add Note</h1>
                <input className='shadow-gray-700 focus:outline-none p-2 bg-gray-600 rounded-xl text-gray-100'
                       type='text' id='title' name='title' placeholder='Add a new title'/>
                <textarea className='indent-2 focus:outline-none rounded-xl bg-gray-400'
                          id='content' name='content' placeholder='Add a new content'/>
                <input type='hidden' name='userId' value={userId}/>
                <SubmitButton/>
            </form>

            <h1 className='text-center text-6xl font-extrabold'>{state?.message}</h1>
        </>

    )
}
