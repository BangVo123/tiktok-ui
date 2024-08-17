import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    let [curUser, setCurUser] = useState({});

    return (
        <UserContext.Provider
            value={{
                curUser,
                setCurUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
