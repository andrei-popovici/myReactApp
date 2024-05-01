import pb from "@/app/lib/pocketbase";
import Link from "next/link";
import * as querystring from "node:querystring";

export const dynamic = 'auto',
    dynamicParams = true,
    revalidate = 0,
    fetchCache = 'auto',
    runtime = 'nodejs',
    preferredRegion = 'auto'

export async function getNotes(storedUser:string|null) {
    if (!storedUser) {
        // Handle case when user is not logged in
        console.error("User not logged in");
        return [];
    }

    try {
        const queryString = `user = "${storedUser}"`;
        // Retrieve notes associated with the current user
        const data = await pb.collection('notes').getList(1,30,{ filter: queryString});
        return data?.items as any[];
    } catch(error) {
        console.error("Error fetching notes:", error);
        return [];
    }
}

export function Note({ note }: any) {
    const { id, title, content, created } = note || {};

    return (
        <Link href={`/notes/${id}`}>
            <div className='noteS'>
                <h2 className='text-xl font-bold'>{title}</h2>
                <h5>{content}</h5>
                <p>{created}</p>
            </div>
        </Link>
    );
}