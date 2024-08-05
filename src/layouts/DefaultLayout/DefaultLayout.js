import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './DefaultLayout.module.scss';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Button from '~/components/Button';
import Modal from '~/components/Modal';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [isShowModal, setIsShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const handleOpenModal = () => {
        setIsShowModal(true);
    };

    const handleCloseModal = () => {
        setIsShowModal(false);
    };

    const handleChangeIsLogin = () => setIsLogin(!isLogin);

    return (
        <div className={cx('wrapper')}>
            <Modal
                isOpen={isShowModal}
                isLogin={isLogin}
                onCloseModal={handleCloseModal}
                onChangeIsLogin={handleChangeIsLogin}
            />
            <Header onShowModal={handleOpenModal} />
            <div className={cx('container')}>
                <Sidebar onShowModal={handleOpenModal} />
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
