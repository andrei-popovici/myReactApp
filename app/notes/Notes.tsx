import {getNotesUser,Note} from "@/app/notes/getNotes";

export async function Notes(props:{userId:string}) {

    console.log('userId from Notes',props.userId);
    const notes = await getNotesUser(props.userId);
    return (
        <div className='notesPage'>
            {notes?.map(note => {
                return <Note key={note.id} note={note}/>;
            })}
        </div>
    )
}
