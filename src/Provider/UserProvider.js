import { createContext, useState, useRef } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [curUser, setCurUser] = useState({});
    const [isAuthenticate, setIsAuthenticate] = useState(false);
    const [path, setPath] = useState('/');
    const [videos, setVideos] = useState([]);
    const [favorite, setFavorite] = useState({ likes: [], loves: [] });
    const [follow, setFollow] = useState([]);
    const paginateRef = useRef({ page: 1, limit: 5 });

    return (
        <UserContext.Provider
            value={{
                curUser,
                setCurUser,
                isAuthenticate,
                setIsAuthenticate,
                path,
                setPath,
                videos,
                setVideos,
                paginateRef,
                favorite,
                setFavorite,
                follow,
                setFollow,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
