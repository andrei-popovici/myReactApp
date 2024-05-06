'use client';
import {createImage} from "@/app/AiPhoto/imageHandling";
import React, {useRef} from "react";

export default function PromptAi() {
    const ref = useRef<HTMLFormElement>(null);
    return (
        <form ref = {ref} className='prompt left-16 bg-secondary border-2 border-gray-400 h-32 gap-y-1'
              action={async formData => {
                  ref.current?.reset();
                  await createImage(formData)
              }}>
            <label className='text-center text-xl font-extrabold text-gray-950'>Prompt</label>
            <input className='indent-2 h-12 p-1 rounded-xl text-gray-950 focus:outline-none' name='prompt' type='text'/>
            <button className='relative shadow-2xl top-1 p-0.5 min-w-min px-1.5 bg-white rounded self-center
                            text-gray-700 hover:bg-gray-800 hover:text-white transition-all duration-200 ease-linear hover'
                    type="submit">
                Put it in the oven ⏲️
            </button>
        </form>

    )
}
