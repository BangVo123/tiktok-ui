import { Fragment, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes';
import DefaultLayout from './layouts';
import * as httpRequest from './utils/httpRequest';
import { UserContext } from './Provider/UserProvider';
import ProtectRoutes from './components/ProtectRoute';

function App() {
    const {
        curUser,
        setCurUser,
        setIsAuthenticate,
        setVideos,
        paginate,
        setPaginate,
    } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching videos data...');
                const videosRes = await httpRequest.get(
                    `/video`,
                    { page: paginate.page, limit: paginate.limit },
                    {
                        withCredentials: true,
                    },
                );
                if (videosRes.data) {
                    setPaginate({ page: 2, limit: 5 });
                    setVideos(videosRes.data);
                }

                console.log('Fetching user data...');
                const userRes = await httpRequest.get(
                    '/auth',
                    {},
                    {
                        withCredentials: true,
                    },
                );
                if (userRes.data) {
                    setCurUser(userRes.data);
                    setIsAuthenticate(true);
                }
            } catch (e) {
                console.error('API Fetch Error:', e);
            }
        };

        if (Object.keys(curUser).length === 0) {
            fetchData();
        }
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
