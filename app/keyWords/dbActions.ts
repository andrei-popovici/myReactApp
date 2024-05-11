'use server';
import pb from "@/app/lib/pocketbase";


export async function getUsersByKeyWord(word: string) {
    const keyWord = await pb.collection("keyWords").getFirstListItem(`content="${word}"`)
    const id = keyWord.id;

    const users = await pb.collection("users").getList(1, 30, {
        filter: `keyByUser_via_user.keyword ?~ "${id}"`,
    })

    console.log(users.items as any[]);

    return users?.items as any[]

}

export async function createKeyWord(formData: FormData,) {

    const word = formData.get('keyWord') as string
    const userId = formData.get('userId') as string;

    try {
        const users = await getUsersByKeyWord(word);
        console.log('exists');
        if (!users.map(user => user = user.id).includes(userId)) {
            const keyWord = await pb.collection("keyWords").getFirstListItem(`content="${word}"`)
            const keyUser = await pb.collection("keyByUser").getFirstListItem(`keyword="${keyWord.id}"`)
            await pb.collection("keyByUser").update(`${keyUser.id}`, {
                'user+': `${userId}`
            })
        } else {
            console.log('You already have this keyword !');
        }
    } catch (_) {
        console.log('doesn t');
        const key = await pb.collection("keyWords").create({
                    'content': `${word}`
                })
                console.log(key);
                try {
                    const keyUser = await pb.collection("keyByUser").create({
                        'keyword': `${key.id}`,
                        'user': `${userId}`
                    })
                }catch(e){
                    console.log(e);
                }
    }

}


