'use client';
import {useFormStatus} from "react-dom";
import {useRef} from "react";
import {setWord} from "@/app/keyWords/dbActions";

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

export function Query() {
    const ref = useRef<HTMLFormElement>(null);
    return (
        <>
            <form ref={ref} action={async formData => {
                ref.current?.reset();
                await setWord(formData);
            } } className='prompt mt-24'>
                <h1 className='text-center text-xl font-extrabold'>Search by KeyWord</h1>
                <input className='shadow-gray-700 focus:outline-none p-2 bg-gray-600 rounded-xl text-gray-100'
                       type='text' id='keyWord' name='keyWord' />
                <SubmitButton/>
            </form>
        </>
    )
}
