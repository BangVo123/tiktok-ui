import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { useContext } from 'react';
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
    UserIcon,
} from '~/components/Icons';
import FollowingAccounts from '~/components/FollowingAccounts';
import Footer from './Footer';
import Button from '~/components/Button';
import { UserContext } from '~/Provider/UserProvider';

const cx = classNames.bind(styles);

function Sidebar({ onShowModal }) {
    const { curUser, setCurUser } = useContext(UserContext);

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
                    {Object.keys(curUser).length !== 0 ? (
                        <MenuItem
                            title={'Friend'}
                            to={config.routes.friend}
                            icon={<DefaultGroupUserIcon />}
                            activeIcon={<ActiveGroupUserIcon />}
                        />
                    ) : null}
                    <MenuItem
                        title={'LIVE'}
                        to={config.routes.live}
                        icon={<DefaultLiveIcon />}
                        activeIcon={<ActiveLiveIcon />}
                    />
                    <MenuItem
                        key={1}
                        title={'Profile'}
                        to={config.routes.profile}
                        icon={
                            <UserIcon width="2.6rem" height="2.6rem" className={cx('menu-icon')} />
                        }
                        onClick={(e) => {
                            e.preventDefault();
                            onShowModal();
                        }}
                    />
                </Menu>
            </div>

            {Object.keys(curUser).length !== 0 ? (
                <FollowingAccounts lable="Following accounts" />
            ) : (
                <div className={cx('container')}>
                    <h4 className={cx('title')}>
                        Log in to follow creators, like videos, and view comments.
                    </h4>
                    <Button
                        outline
                        className={cx('btn')}
                        onClick={() => {
                            onShowModal();
                        }}
                    >
                        Log in
                    </Button>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Sidebar;
