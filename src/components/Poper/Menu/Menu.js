import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { Wrapper as PoperWrapper } from '~/components/Poper';
import MenuItem from './MenuItem';
import Header from './Header';
import styles from './Menu.module.scss';
import config from '~/config';
import { useUser } from '~/Provider/UserProvider';
import { ConfirmModal } from '~/components/Modal';
import * as httpRequest from '~/utils/httpRequest';

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Menu({ children, hideOnClick = false, onChange = defaultFn }) {
    const { curUser, path, setCurUser, setIsAuthenticate, isAuthenticate } =
        useUser();

    const [history, setHistory] = useState([
        { data: config.headerMenu.PUBLIC_MENU_ITEMS },
    ]);
    const current = history[history.length - 1];

    const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);

    const handleOpenConfirmModal = () => {
        setIsShowConfirmModal(true);
    };

    const handleCloseModal = () => {
        setIsShowConfirmModal(false);
    };

    useEffect(() => {
        if (!isAuthenticate) {
            setHistory([{ data: config.headerMenu.PUBLIC_MENU_ITEMS }]);
        } else {
            if (path === '/upload') {
                setHistory([{ data: config.headerMenu.UPLOAD_MENU }]);
            } else {
                setHistory([{ data: config.headerMenu.PRIVATE_MENU_ITEM }]);
            }
        }
    }, [curUser, path]);

    const renderItem = () => {
        return current.data.map((item, idx) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={idx}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        }
                        if (item.title === 'Log out') {
                            handleOpenConfirmModal();
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const renderResult = (attrs) => {
        return (
            //tabindex: not allow using tab on keyboard to focus element
            <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                <PoperWrapper className={cx('menu-poper')}>
                    {history.length > 1 && (
                        <Header title={current.title} onBack={handleBack} />
                    )}
                    <div className={cx('body')}>{renderItem()}</div>
                </PoperWrapper>
            </div>
        );
    };

    //reset to first page
    const handleResetMenu = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    const handleAccept = async () => {
        // call api to logout here
        try {
            await httpRequest.get(
                '/auth/logout',
                {},
                // { withCredentials: true },
            );
            //set curUser = null t reload page, hide confirm dialog
            setCurUser();
            setIsAuthenticate(false);
            handleCloseModal();
            localStorage.clear();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Tippy
                interactive
                hideOnClick={hideOnClick}
                delay={[0, 700]}
                render={renderResult}
                onHide={handleResetMenu}
                zIndex={1}
            >
                {children}
            </Tippy>
            <ConfirmModal
                isOpen={isShowConfirmModal}
                handleCancel={handleCloseModal}
                handleAccept={handleAccept}
                content="Are you sure you want to log out?"
            />
        </>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
