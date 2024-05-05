import {AddNote} from "@/app/notes/AddNote";
import UserContext from "@/app/userContext";
import {Notes} from "@/app/notes/Notes";
import {useContext} from "react";
import GetUser from "@/app/notes/getUser";

export default   function NotesPage() {
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

    return (
            <div className='flex flex-col gap-y-6 h-screen bg-secondary overflow-y-auto overflow-x-hidden '>
                <h1 className='relative mt-2 text-gray-950 text-5xl font-bold left-28'>Notes</h1>
                <GetUser>
                    <Notes storedUser='7duu1mvlgjij69y'/>
                </GetUser>
                <AddNote/>
            </div>
        );
}

