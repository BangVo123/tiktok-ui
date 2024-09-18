//Allow using "-" when using name of class for scss
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
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
import { useModal } from '~/Provider/ModalProvider';

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

function Header() {
    const { curUser, path, isAuthenticate } = useContext(UserContext);
    const { onOpenModal } = useModal();

    return (
        <header className={cx('wrapper')}>
            <div className={cx('logo')} tabIndex={-1}>
                <Button to={config.routes.home}>
                    <img src={images.logo} alt="" className={cx('tk-logo')} />
                </Button>
                {path === '/upload' ? (
                    <div className={cx('studio')}>Studio</div>
                ) : (
                    ''
                )}
            </div>

            {/* Search */}
            {path === '/upload' ? null : <Search />}

            <div className={cx('action')}>
                {isAuthenticate ? (
                    <>
                        {path === '/upload' ? null : (
                            <>
                                <Button
                                    className={cx('upload-btn')}
                                    to={config.routes.upload}
                                    normal
                                    leftIcon={<FontAwesomeIcon icon={faPlus} />}
                                >
                                    Upload
                                </Button>
                                <Tippy
                                    delay={[0, 200]}
                                    content="Messages"
                                    placement="bottom"
                                >
                                    <button className={cx('action-btn')}>
                                        <MessageIcon />
                                    </button>
                                </Tippy>
                                <Tippy
                                    delay={[0, 200]}
                                    content="Inbox"
                                    placement="bottom"
                                >
                                    <button
                                        className={cx('action-btn', 'inbox')}
                                    >
                                        <InboxIcon />
                                        <span className={cx('inbox-nums')}>
                                            12
                                        </span>
                                    </button>
                                </Tippy>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <Button primary onClick={onOpenModal}>
                            Log in
                        </Button>
                    </>
                )}
                <Menu onChange={handleMenuChange}>
                    {Object.keys(curUser).length !== 0 ? (
                        <Image
                            className={cx('avt')}
                            src={curUser.avatar}
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
