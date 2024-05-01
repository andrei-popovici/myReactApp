'use client';
import React, {createContext} from "react";

const UserContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(['', () => {}]);

export default UserContext;