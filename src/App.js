import { Fragment, useContext, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from './layouts';
import httpRequest from './utils/httpRequest';
import { UserContext } from './Provider/UserProvider';

function App() {
    let { curUser, setCurUser } = useContext(UserContext);
    const hasFetch = useRef(false);

    useEffect(() => {
        console.log('a');
        console.log('cur user: ', curUser);
        if (Object.keys(curUser).length === 0) {
            console.log('b');
            fetchData();
        }
    }, [curUser]);

    const fetchData = async () => {
        if (!hasFetch.current) {
            hasFetch.current = true;
            return;
        }
        hasFetch.current = false;
        console.log('c');
        try {
            // const res = await fetch('http://127.0.0.1:3050/api/v1/auth', {
            //     method: 'GET',
            //     credentials: 'include',
            // });
            const res = await httpRequest.get('/auth', { withCredentials: true });
            console.log(res);
            setCurUser(res.user);
        } catch (e) {
            console.log(e);
        }
    };

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
