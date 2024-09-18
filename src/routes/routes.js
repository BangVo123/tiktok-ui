import { HeaderOnly } from '~/layouts';
import config from '~/config';

import Home from '~/page/Home';
import Following from '~/page/Following';
import Profile from '~/page/Profile';
import Upload from '~/page/Upload';
import Search from '~/page/Search';
import Explore from '~/page/Explore';
import Friend from '~/page/Friend';
import Live from '~/page/Live';

//Public route with not login
const routes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following, private: true },
    { path: config.routes.profile, component: Profile, private: true },
    { path: config.routes.explore, component: Explore },
    { path: config.routes.friend, component: Friend, private: true },
    { path: config.routes.live, component: Live },
    { path: config.routes.upload, component: Upload, private: true },
    { path: config.routes.search, component: Search, layout: null },
];

export default routes;
