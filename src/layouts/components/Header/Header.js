//Allow using "-" when using name of class for scss
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link, useLocation } from 'react-router-dom';
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

function Header({ onShowAuthModal }) {
    const { curUser } = useContext(UserContext);

    const location = useLocation();

    return (
        <header className={cx('wrapper')}>
            <div className={cx('logo')}>
                <Link to={config.routes.home}>
                    <img src={images.logo} alt="" className={cx('tk-logo')} />
                </Link>
                {location.pathname === '/upload' ? <div className={cx('studio')}>Studio</div> : ''}
            </div>

            {/* Search */}
            {location.pathname === '/upload' ? null : <Search />}

            <div className={cx('action')}>
                {Object.keys(curUser).length !== 0 ? (
                    <>
                        {location.pathname === '/upload' ? null : (
                            <>
                                <Button
                                    className={cx('upload-btn')}
                                    to={config.routes.upload}
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
                                        <span className={cx('inbox-nums')}>12</span>
                                    </button>
                                </Tippy>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <Button
                            primary
                            onClick={() => {
                                onShowAuthModal();
                            }}
                        >
                            Log in
                        </Button>
                    </>
                )}
                <Menu onChange={handleMenuChange}>
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
