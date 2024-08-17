import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState, useContext, useEffect } from 'react';

import { Wrapper as PoperWrapper } from '~/components/Poper';
import MenuItem from './MenuItem';
import Header from './Header';
import styles from './Menu.module.scss';
import config from '~/config';
import { UserContext } from '~/Provider/UserProvider';
import { ConfirmModal } from '~/components/Modal';

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Menu({ children, hideOnClick = false, onChange = defaultFn }) {
    const { curUser } = useContext(UserContext);

    const [history, setHistory] = useState([{ data: config.headerMenu.PUBLIC_MENU_ITEMS }]);
    const current = history[history.length - 1];

    const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);

    const handleOpenConfirmModal = () => {
        setIsShowConfirmModal(true);
    };

    const handleCloseModal = () => {
        setIsShowConfirmModal(false);
    };

    useEffect(() => {
        if (Object.keys(curUser).length === 0) {
            setHistory([{ data: config.headerMenu.PUBLIC_MENU_ITEMS }]);
        } else {
            setHistory([{ data: config.headerMenu.PRIVATE_MENU_ITEM }]);
        }
    }, [curUser]);

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
                        // else {
                        //     onChange(item);
                        // }
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
                    {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
                    <div className={cx('body')}>{renderItem()}</div>
                </PoperWrapper>
            </div>
        );
    };

    //reset to first page
    const handleResetMenu = () => {
        setHistory((prev) => prev.slice(0, 1));
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
            <ConfirmModal isOpen={isShowConfirmModal} handleCancel={handleCloseModal} />
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
