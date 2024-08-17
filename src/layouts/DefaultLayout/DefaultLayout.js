import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './DefaultLayout.module.scss';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Button from '~/components/Button';
import { AuthModal } from '~/components/Modal';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [isShowAuthModal, setIsShowAuthModal] = useState(false);

    const handleOpenAuthModal = () => {
        setIsShowAuthModal(true);
    };

    const handleCloseModal = () => {
        setIsShowAuthModal(false);
    };

    return (
        <div className={cx('wrapper')}>
            <AuthModal isOpen={isShowAuthModal} onCloseModal={handleCloseModal} />
            <Header onShowAuthModal={handleOpenAuthModal} />
            <div className={cx('container')}>
                <Sidebar onShowModal={handleOpenAuthModal} />
                <div className={cx('content')}>{children}</div>
                <Button rounded text className={cx('float-btn')}>
                    Get app
                </Button>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
