import {cookies} from "next/headers";
import {getUsersByKeyWord} from "@/app/keyWords/dbActions";

export async function Users() {
    const wordCookie = cookies().get('word');
    let word;
    if(wordCookie){
        const {keyword} = JSON.parse(wordCookie.value);
        word = keyword;
    }

    const users = await getUsersByKeyWord(word);

    return (
        <div className='notesPage'>
            {users?.map(user => {
                return <User key={user.id} user={user}/>;
            })}
        </div>
    )
}

export function User({user}:any){
    const {username} = user || {};
    return(
        <div className='bg-gray-800 text-gray-50 rounded-xl'>{username}</div>
    )
}