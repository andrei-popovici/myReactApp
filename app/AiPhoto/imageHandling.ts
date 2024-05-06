'use server';
import pb from "@/app/lib/pocketbase";
import {cookies} from "next/headers";

export async function getImageURL(prompt: string): Promise<string> {
    const response = await fetch('http://localhost:8080/cook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: prompt,
        }),
    });

    const {imageURL} = await response.json();
    return imageURL.toString();
}

export async function addImageToDb(imageURL: string, user: string): Promise<any> {
    await pb.collection('photos').create({"image": imageURL, "user": user});
}

export async function createImage(formData: FormData) {
    const cookie = cookies().get('pb_auth');

    if (!cookie) {
        alert('User not logged in');
        return;
    }

    const {model} = JSON.parse(cookie.value);

    const prompt = formData.get('prompt') as string;

    console.log(`Creating image... ${prompt}`);

    try {
        const loading = 'yes';

        cookies().set('loadingState',loading, {
            secure: true,
            path: '/',
            sameSite: 'strict',
            httpOnly: true,
        });

        const imageURL = await getImageURL(prompt);

        await addImageToDb(imageURL, model.id);

        const imgCookie = JSON.stringify({imageURL});
        console.log("imgCookie: ",imgCookie);

        if (cookies().get('image')) {
            cookies().delete('image');
        }

        cookies().set('image', imgCookie, {
            secure: true,
            path: '/',
            sameSite: 'strict',
            httpOnly: true,
        });
    } catch (err) {
        console.log(err);
    }

};
