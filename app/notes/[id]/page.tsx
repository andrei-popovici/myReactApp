import pb from "@/app/lib/pocketbase"
async function getNote(noteId: string) {
    // const response = await pb.collection('notes').getOne(noteId);
    // return response;
    const response = await fetch(`http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
        {
                next: {revalidate:10}
        }
        );
    const jR = await response.json();
    return jR;
}

export default async function Page({ params }: any) {
    console.log("params.id:", params.id);

        const note = await getNote(params.id);
        console.log("Note:", note);

        async function deleteNote() {
            'use server';
            try {
                const response = await pb.collection('notes').delete(params.id);
            }catch(e){
                console.error("Not able to delete note :(");
                return;
            }
        }

        return (
            <div className='flex flex-col h-screen bg-secondary overflow-hidden justify-center items-center'>
                <h1 className='fixed top-40 text-gray-950 text-3xl font-bold'>Notes/{note.id}</h1>
                <div className='notePart'>
                    <h3 className='text-xl font-bold'>{note.title}</h3>
                    <h5>{note.content}</h5>
                    <p>{note.created}</p>
                </div>
                <form action={deleteNote}>
                    <button type='submit' className=' relative bg-gray-300 rounded p-1 mt-28 scale-125
                    hover:bg-gray-400 hover:font-bold transition-all duration-75 ease-linear'>Delete</button>
                </form>
            </div>
        );
}
