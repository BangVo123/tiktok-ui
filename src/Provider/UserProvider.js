import { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    let [curUser, setCurUser] = useState({});
    let [path, setPath] = useState('/');
    let [videos, setVideos] = useState([]);
    let [paginate, setPaginate] = useState({ page: 1, limit: 5 });

    return (
        <UserContext.Provider
            value={{
                curUser,
                setCurUser,
                path,
                setPath,
                videos,
                setVideos,
                paginate,
                setPaginate,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
