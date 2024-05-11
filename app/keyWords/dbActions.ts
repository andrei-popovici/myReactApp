import pb from "@/app/lib/pocketbase";
import {cookies} from "next/headers";
import {createServerOnlyClientOnlyAliases} from "next/dist/build/create-compiler-aliases";


export async function getUsersByKeyWord() {
    const cookie = cookies().get('pb_auth');
    const usersWithCarsKeyword = await pb.collection('keyByUser').getList(
        1, 20,
        {
            filter: pb.filter("keyword = {:keyword}", {keyword: "687864tzz79p50d"})
        })
    const users = usersWithCarsKeyword.items as any[];

console.log(users);



}

export function getUserNames(users:string[]){
    for (let i = 0; i < users.length; i++) {
        const userName = await pb.collection('users').getOne("nr1h3o5lot731xs");
        console.log('userName', userName);
        //const userName = await pb.collection('users').getOne(':dj2dzw21t7sjvf9');
        //console.log(userName.id);
    }
}

