'use client';
import {useFormStatus} from "react-dom";
import {createNote} from "@/app/notes/CreateNote";
import {useRef} from "react";

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

export function AddNote(props:{userId:string}) {
    const ref = useRef<HTMLFormElement>(null);
    return (
        <>
            <form ref={ref} action={async formData => {
                ref.current?.reset();
                await createNote(formData)} }className='prompt'>
                <h1 className='text-center text-xl font-extrabold'>Add Note</h1>
                <input className='shadow-gray-700 focus:outline-none p-2 bg-gray-600 rounded-xl text-gray-100'
                       type='text' id='title' name='title' placeholder='Add a new title'/>
                <textarea className='indent-2 focus:outline-none rounded-xl bg-gray-400'
                          id='content' name='content' placeholder='Add a new content'/>
                <input type='hidden' name='userId' value={props.userId}/>
                <SubmitButton/>
            </form>

        </>

    )
}
