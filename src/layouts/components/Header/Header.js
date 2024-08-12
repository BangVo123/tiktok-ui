//Allow using "-" when using name of class for scss
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faHouseCrack,
    faPlus,
    faMoon,
    faUser,
    faCoins,
    faGear,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Poper/Menu/Menu';
import { InboxIcon, MessageIcon } from '~/components/Icons/Icons';
import Image from '~/components/Image';
import Search from '../Search/Search';
import config from '~/config';
import { UserContext } from '~/Provider/UserProvider';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faHouseCrack} />,
        title: 'Creator tools',
    },
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Viet Nam',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faMoon} />,
        title: 'Dark mode',
    },
];

//Handle logic
const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
        case 'language':
            console.log(menuItem);
            break;

        default:
            console.log(1);
    }
};

const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View profile',
        to: '/@hoaa',
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Get coins',
        to: '/coin',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Setting',
        to: '/feedback',
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        to: '/feedback',
        separate: true,
    },
];

function Header({ onShowModal }) {
    const { curUser, setCurUser } = useContext(UserContext);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('logo')}>
                <Link to={config.routes.home}>
                    <img src={images.logo} alt="" />
                </Link>
            </div>

            {/* Search */}
            <Search />

            <div className={cx('action')}>
                {Object.keys(curUser).length !== 0 ? (
                    <>
                        <Button
                            className={cx('upload-btn')}
                            normal
                            leftIcon={<FontAwesomeIcon icon={faPlus} />}
                        >
                            Upload
                        </Button>
                        <Tippy delay={[0, 200]} content="Messages" placement="bottom">
                            <button className={cx('action-btn')}>
                                <MessageIcon />
                            </button>
                        </Tippy>
                        <Tippy delay={[0, 200]} content="Inbox" placement="bottom">
                            <button className={cx('action-btn', 'inbox')}>
                                <InboxIcon />
                            </button>
                        </Tippy>
                    </>
                ) : (
                    <>
                        <Button
                            primary
                            onClick={() => {
                                onShowModal();
                            }}
                        >
                            Log in
                        </Button>
                    </>
                )}
                <Menu
                    items={Object.keys(curUser).length !== 0 ? userMenu : MENU_ITEMS}
                    onChange={handleMenuChange}
                >
                    {Object.keys(curUser).length !== 0 ? (
                        <Image className={cx('avt')} src={curUser.avatar} alt="Nguyen Van A" />
                    ) : (
                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                    )}
                </Menu>
            </div>
        </header>
    );
}

export default Header;
