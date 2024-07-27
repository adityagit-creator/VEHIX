import React from "react";
import UserContext from "./UserContext";
import { useState } from "react";
const UserContextProvider = ({children})=>{
    const [files , setFiles] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [user, setUser] = useState(false);

    return(
        <UserContext.Provider value={{files, setFiles, vehicles, setVehicles, unreadCount, setUnreadCount, user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;   