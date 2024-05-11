import {getUsersByKeyWord} from "@/app/keyWords/dbActions";

export const dynamic = 'auto',
    dynamicParams = true,
    revalidate = 0,
    fetchCache = 'auto',
    runtime = 'nodejs',
    preferredRegion = 'auto'

export default function KeyWords(){
    const users  = getUsersByKeyWord();
    return(
        <li>

        </li>
    );
}