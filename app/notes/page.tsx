// import {AddNote} from "@/app/notes/AddNote";
// import UserContext from "@/app/userContext";
// import {Notes} from "@/app/notes/Notes";
// import {useContext} from "react";
// import GetUser from "@/app/notes/getUser";

import {cookies} from "next/headers";
import {logout} from "@/app/actions";
import {Notes} from './Notes'
import {AddNote} from "./AddNote";
import {RefreshOnFocus} from "@/app/notes/refreshOnFocus";
import {redirect} from "next/navigation";

export default async function NotesPage() {
    // const [notes, setNotes] = useState<any[]>([]);
    // const [user, setUser] = useState<string | null>("");
    // const router = useRouter();
    //
    // useEffect(() => {
    //     const storedUser = localStorage.getItem('user');
    //
    //     if (!storedUser) {
    //         console.error("User not logged in");
    //     }
    //     setUser(storedUser);
    //     // Fetch notes associated with the current user
    //     getNotesUser(storedUser).then(data => {
    //         setNotes(data);
    //     }).catch(error => {
    //         console.error("Error fetching notes:", error);
    //     });
    //     console.log(notes);
    //     console.log('it s here');
    //     console.log(storedUser);
    //
    // }, []);
    // console.log(notes);
    // console.log(`User is "${user}"`);
    //
    // const notes = await getNotesUser('1');
    const cookie = cookies().get('pb_auth');

    // This never happens because of the middleware,
    // but we must make typescript happy
    if (!cookie){

        console.log("User not found");
        redirect('/');

    }

    const {model} = JSON.parse(cookie.value);

    console.log('userId from pages',model.id);
    return (
        <div className='flex flex-col gap-y-6 h-screen bg-secondary overflow-y-auto overflow-x-hidden '>
            <h1 className='relative mt-2 text-gray-950 text-5xl font-bold left-28'>Notes</h1>
            <Notes userId={model.id}/>
            <AddNote userId={model.id}/>
            <RefreshOnFocus/>
        </div>

    );
}

