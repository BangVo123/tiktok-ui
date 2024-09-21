import { createContext, useState, useRef } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [curUser, setCurUser] = useState({});
    const [isAuthenticate, setIsAuthenticate] = useState(false);
    const [path, setPath] = useState('/'); //
    const [videos, setVideos] = useState([]);
    const [paginate, setPaginate] = useState({ page: 1, limit: 5 }); //
    const [favorite, setFavorite] = useState({ likes: [], loves: [] });

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
                paginate,
                setPaginate,
                favorite,
                setFavorite,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
