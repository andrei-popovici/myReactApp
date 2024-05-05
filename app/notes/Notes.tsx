import {getNotesUser,Note} from "@/app/notes/getNotes";
interface ChildProps {
    storedUser: any; // Adjust the type according to your storedUser data type
}
export async function Notes({ storedUser }: ChildProps) {

    console.log(storedUser);
    const notes = await getNotesUser(storedUser);
    return (
        <div className='notesPage'>
            {notes?.map(note => {
                return <Note key={note.id} note={note}/>;
            })}
        </div>
    )
}
