import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes';
import DefaultLayout from './layouts';
import * as httpRequest from './utils/httpRequest';
import { useUser } from './Provider/UserProvider';
import ProtectRoutes from './components/ProtectRoute';
import io from 'socket.io-client';

function App() {
    const {
        curUser,
        setCurUser,
        setIsAuthenticate,
        setVideos,
        paginateRef,
        setFavorite,
        setFollow,
        accountRelations,
        socketInstance,
    } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching videos data...');
                const videosRes = await httpRequest.get(`/video`, {
                    page: paginateRef.current.page,
                    limit: paginateRef.current.limit,
                });

                console.log('videosRes.data : ', videosRes.data);
                if (videosRes.data) {
                    paginateRef.current.page = 2;
                    setVideos(videosRes.data);
                }

                const token = localStorage.getItem('token');
                console.log('Fetching user data...');
                const userRes = await httpRequest.get(
                    '/users',
                    {},
                    {
                        headers: token
                            ? { Authorization: `Bearer ${token}` }
                            : {},
                    },
                );

                if (userRes?.data) {
                    setCurUser(userRes.data.user);
                    setIsAuthenticate(true);
                    setFavorite(userRes.data?.favorite);
                    setFollow(userRes.data?.follow);
                    accountRelations.current = userRes.data?.accRelations;
                    console.log(userRes.data.accRelations);
                }

                //connect socket
                socketInstance.current = io(process.env.REACT_APP_SOCKET_URL);
            } catch (e) {
                console.error('API Fetch Error:', e);
            }
        };

        if (Object.keys(curUser).length === 0) {
            fetchData();
        }

        return () => {
            if (socketInstance.current) {
                socketInstance.current.disconnect();
            }
        };
    }, []);

    return (
        <Router>
            <ToastContainer />
            <div className="App">
                <Routes>
                    {routes.map((route, idx) => {
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        const Page = route.component;
                        return (
                            <Route
                                key={idx}
                                path={route.path}
                                element={
                                    <ProtectRoutes private={route.private}>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </ProtectRoutes>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
