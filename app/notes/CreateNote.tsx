'use server';
import pb from "@/app/lib/pocketbase";
import {z} from "zod";
import {revalidatePath} from "next/cache";

export async function createNote(
    prevState: {
        message:string;
    },
    formData: FormData,
) {

    const schema = z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        userId: z.string().min(1),
    });
    const parse = schema.safeParse({
        title: formData.get("title"),
        content: formData.get("content"),
        userId: formData.get("userId"),
    });

    if (!parse.success) {
        return {message: "Failed to create todo"};
    }

    const data = parse.data;

    try {
        await pb.collection('notes').create({"title": data.title, "content": data.content, "user": data.userId});

      revalidatePath('@/app/notes');
        // redirect('/notes');
        return {message: "Successfully created"};
    }catch (e){
        return {message: "Failed to create note"};
    }
}





