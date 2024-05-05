import pb from "@/app/lib/pocketbase";

export async function getImageURL(prompt:string):Promise<string> {
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

export async function addImageToDb(imageURL:string,user:string):Promise<any> {
    await pb.collection('photos').create({"image": imageURL, "user": user});
}