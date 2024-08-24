import { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    let [curUser, setCurUser] = useState({});
    let [path, setPath] = useState('/');
    

    return (
        <UserContext.Provider
            value={{
                curUser,
                setCurUser,
                path,
                setPath
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
