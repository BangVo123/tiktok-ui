import { Fragment, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { publicRoutes } from '~/routes';
import DefaultLayout from './layouts';
import * as httpRequest from './utils/httpRequest';
import { UserContext } from './Provider/UserProvider';

function App() {
    let { curUser, setCurUser } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching user data...');
                const res = await httpRequest.get('/auth', {
                    withCredentials: true,
                });
                if (res.data) {
                    setCurUser(res.data);
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
