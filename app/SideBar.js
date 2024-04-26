import Link from "next/link";
import React from "react";
import "./globals.css";

import { SiGooglehome } from "react-icons/si";
import { FaNoteSticky } from "react-icons/fa6";
import { LiaRobotSolid } from "react-icons/lia";

const SideBar = () =>{
return(
    <div className='fixed top-0 left-0 h-screen w-24 m-0
    flex flex-col bg-gray-900 shadow'>
        <Link href="/">
            <SideBarIcon icon={<SiGooglehome size='35'/>} version='house' />
        </Link>
        <Link href="/notes">
            <SideBarIcon icon={<FaNoteSticky size='40'/>} version='note' />
        </Link>
        <Link href="/AiPhoto">
            <SideBarIcon icon={<LiaRobotSolid size='45'/>} version='robot' />
        </Link>
    </div>
)
};

const SideBarIcon = ({icon,version}) =>{

    let text = '';
    if(version === 'house'){
        return (
            <div className='sidebar-icon pb-1.5 group'>
                {icon}
                <span className='sidebar-tooltip pt-1.5 group-hover:scale-100'>Home 🏠</span>
            </div>
        );
    }else if(version === 'note'){
        text = 'Notes 📝';
    }else if(version === 'robot'){
        text = 'Ai Generator 🦾';
    }
    return (
        <div className='sidebar-icon group' >
            {icon}
            <span className='sidebar-tooltip group-hover:scale-100'>{text}</span>
        </div>
    );



}

export default SideBar;