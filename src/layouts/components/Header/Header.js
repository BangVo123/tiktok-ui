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

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Poper/Menu/Menu';
import { InboxIcon, MessageIcon } from '~/components/Icons/Icons';
import Image from '~/components/Image';
import Search from '../Search/Search';
import config from '~/config';

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

const currentUser = false;

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
                {currentUser ? (
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
                        <Button primary onClick={onShowModal}>
                            Log in
                        </Button>
                    </>
                )}
                <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                    {currentUser ? (
                        <Image
                            className={cx('avt')}
                            src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/1e7a2459fff815bcdc28aa59a7c41893.jpeg?lk3s=a5d48078&nonce=53083&refresh_token=cc172fbc0ae55e7699a57156af43d3f1&x-expires=1722175200&x-signature=QeF16MACUBPvib1%2BPSj162Yrwb4%3D&shp=a5d48078&shcp=b59d6b55"
                            alt="Nguyen Van A"
                        />
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
