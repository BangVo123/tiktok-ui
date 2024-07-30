import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import {
    DefaultHomeIcon,
    DefaultCompassIcon,
    DefaultFollowIcon,
    DefaultGroupUserIcon,
    DefaultLiveIcon,
    ActiveHomeIcon,
    ActiveCompassIcon,
    ActiveFollowIcon,
    ActiveGroupUserIcon,
    ActiveLiveIcon,
} from '~/components/Icons';
import FollowingAccounts from '~/components/FollowingAccounts';
import Footer from './Footer';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navigator')}>
                <Menu>
                    <MenuItem
                        title={'For you'}
                        to={config.routes.home}
                        icon={<DefaultHomeIcon />}
                        activeIcon={<ActiveHomeIcon />}
                    />
                    <MenuItem
                        title={'Explore'}
                        to={config.routes.explore}
                        icon={<DefaultCompassIcon />}
                        activeIcon={<ActiveCompassIcon />}
                    />
                    <MenuItem
                        title={'Following'}
                        to={config.routes.following}
                        icon={<DefaultFollowIcon />}
                        activeIcon={<ActiveFollowIcon />}
                    />
                    <MenuItem
                        title={'Friend'}
                        to={config.routes.friend}
                        icon={<DefaultGroupUserIcon />}
                        activeIcon={<ActiveGroupUserIcon />}
                    />
                    <MenuItem
                        title={'LIVE'}
                        to={config.routes.live}
                        icon={<DefaultLiveIcon />}
                        activeIcon={<ActiveLiveIcon />}
                    />
                </Menu>
            </div>

            {/* Following account */}
            <FollowingAccounts lable="Following accounts" />
            <Footer />
        </div>
    );
}

export default Sidebar;
