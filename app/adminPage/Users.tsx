import {cookies} from "next/headers";
import {getUsersByKeyWord} from "@/app/keyWords/dbActions";

export async function Users() {
    const wordCookie = cookies().get('word');
    let word;
    if (wordCookie) {
        const {keyword} = JSON.parse(wordCookie.value);
        word = keyword;
    }

    const users = await getUsersByKeyWord(word);

    return (
        <div className='flex flex-col items-center gap-y-4 '>
            {word ?
                <h1 className='relative left-32 text-white text-6xl font-extrabold self-center'>Which users are linked
                    to {word} ?</h1>
                :
                <h1 className='relative left-32 text-white text-6xl font-extrabold self-center'>Search users by their keywords</h1>
            }
            <div className='notesPage flex flex-wrap self-center mt-16'>

                {users?.map(user => {
                    return <User key={user.id} user={user}/>;
                })}
            </div>
        </div>
    )
}

export function User({user}: any) {
    const {username} = user || {};
    return (
        <div className='bg-gray-800 text-gray-50 rounded-xl p-2'>{username}</div>
    )
}