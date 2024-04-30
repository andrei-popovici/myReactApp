'use client';
import React, {createContext} from "react";

const UserContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(['', () => {}]);


export default function UserProvider({ children }: { children: React.ReactNode }) {


    return <>{children}</>;

}()
export default UserContext;