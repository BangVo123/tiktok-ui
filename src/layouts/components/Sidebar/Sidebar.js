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
    FeedbackIcon,
} from '~/components/Icons';
import FollowingAccounts from '~/components/FollowingAccounts';
import Footer from './Footer';
import Button from '~/components/Button';
import { UserContext } from '~/Provider/UserProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBook,
    faChartSimple,
    faCommentDots,
    faLightbulb,
    faListUl,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useModal } from '~/Provider/ModalProvider';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function Sidebar({ onShowModal }) {
    const { curUser, path } = useContext(UserContext);
    const { onOpenModal } = useModal();

    const handleEmptyFunction = (e) => {
        e.preventDefault();
        alert('This function is not currently supported.');
    };

    return (
        <div className={cx('wrapper')}>
            {path !== '/upload' ? (
                <>
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
                                    <>
                                        {Object.keys(curUser).length !== 0 ? (
                                            <Image
                                                src={curUser?.avatar}
                                                className={cx('menu-avt')}
                                                alt=""
                                            />
                                        ) : (
                                            <UserIcon
                                                width="2.6rem"
                                                height="2.6rem"
                                                className={cx('menu-icon')}
                                            />
                                        )}
                                    </>
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    onOpenModal();
                                }}
                            />
                        </Menu>
                    </div>

                    {Object.keys(curUser).length !== 0 ? (
                        <FollowingAccounts lable="Following accounts" />
                    ) : (
                        <div className={cx('container')}>
                            <h4 className={cx('title')}>
                                Log in to follow creators, like videos, and view
                                comments.
                            </h4>
                            <Button
                                outline
                                className={cx('btn')}
                                onClick={onOpenModal}
                            >
                                Log in
                            </Button>
                        </div>
                    )}
                    <Footer />
                </>
            ) : (
                <>
                    <div className={cx('navigator')}>
                        <Menu>
                            <MenuItem
                                title={'Home'}
                                to={'/upload'}
                                icon={<DefaultHomeIcon />}
                                activeIcon={<ActiveHomeIcon />}
                            />
                            <MenuItem
                                title={'Posts'}
                                to={'/abc'}
                                icon={<FontAwesomeIcon icon={faListUl} />}
                                activeIcon={<ActiveHomeIcon />}
                                onClick={(e) => handleEmptyFunction(e)}
                            />
                            <MenuItem
                                title={'Comments'}
                                to={'/a'}
                                icon={<FontAwesomeIcon icon={faCommentDots} />}
                                activeIcon={<ActiveHomeIcon />}
                                onClick={(e) => handleEmptyFunction(e)}
                            />
                            <MenuItem
                                title={'Analytics'}
                                to={'/a'}
                                icon={<FontAwesomeIcon icon={faChartSimple} />}
                                activeIcon={<ActiveHomeIcon />}
                                onClick={(e) => handleEmptyFunction(e)}
                            />
                            <MenuItem
                                title={'Inspirations'}
                                to={'/a'}
                                icon={<FontAwesomeIcon icon={faLightbulb} />}
                                activeIcon={<ActiveHomeIcon />}
                                onClick={(e) => handleEmptyFunction(e)}
                            />
                            <MenuItem
                                title={'Feedback'}
                                to={'/a'}
                                icon={<FeedbackIcon />}
                                activeIcon={<ActiveHomeIcon />}
                                onClick={(e) => handleEmptyFunction(e)}
                            />
                            <MenuItem
                                title={'Creator Academy'}
                                to={'/a'}
                                icon={<FontAwesomeIcon icon={faBook} />}
                                activeIcon={<ActiveHomeIcon />}
                                onClick={(e) => handleEmptyFunction(e)}
                            />
                        </Menu>
                    </div>
                    <Link to={config.routes.home} className={cx('back-btn')}>
                        Back to Tiktok
                    </Link>
                    <div className={cx('footer', 'separate')}>
                        <a
                            href="https://www.tiktok.com/legal/page/row/terms-of-service/en"
                            className={cx('link')}
                        >
                            Terms of Service
                        </a>
                        <a
                            href="https://www.tiktok.com/legal/page/row/privacy-policy/en"
                            className={cx('link')}
                        >
                            Privacy Policy
                        </a>
                        <span className={cx('copyright')}>
                            Copyright © 2024 TikTok
                        </span>
                    </div>
                </>
            )}
        </div>
    );
}

export default Sidebar;
