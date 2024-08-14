import { Fragment, useContext, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from './layouts';
import * as httpRequest from './utils/httpRequest';
import { UserContext } from './Provider/UserProvider';

function App() {
    let { curUser, setCurUser } = useContext(UserContext);

    // useEffect(() => {
    //     let isMounted = true;

    //     const fetchData = async () => {
    //         try {
    //             if (!isMounted) return;

    //             const res = await httpRequest.get('/auth/', { withCredentials: true });
    //             console.log(res);
    //             if (isMounted) setCurUser(res.user);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     };

    //     if (Object.keys(curUser).length === 0) {
    //         fetchData();
    //     }

    //     return () => {
    //         isMounted = false;
    //     };
    // }, [curUser, setCurUser]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching user data...');
                const res = await httpRequest.get('/auth', {
                    withCredentials: true,
                });
                // console.log('API Response:', res);
                setCurUser(res.data);
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
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, idx) => {
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
                                    <Layout>
                                        <Page />
                                    </Layout>
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
