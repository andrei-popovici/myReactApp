import {getUsersByKeyWord} from "@/app/keyWords/dbActions";
import {AddKeyWord} from "@/app/keyWords/AddKeyWord";
import {cookies} from "next/headers";

export const dynamic = 'auto',
    dynamicParams = true,
    revalidate = 0,
    fetchCache = 'auto',
    runtime = 'nodejs',
    preferredRegion = 'auto'

export default  async function KeyWords() {
    // const list = await getUsersByKeyWord("animal");
    let id;
    const cookie = cookies().get('pb_auth');
    if(cookie){
        const {model} = JSON.parse(cookie.value);
        id = model.id;
    }

    return (
         <div className="relative bg-gray-800 h-screen flex flex-wrap flex-col items-center gap-y-4 overflow-hidden">
            <AddKeyWord userId={id}/>
         </div>
    );
}