import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './DefaultLayout.module.scss';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { AuthModal } from '~/components/Modal';
import { UserContext } from '../../Provider/UserProvider';
import ModalProvider, { useModal } from '~/Provider/ModalProvider';
import AuthProvider from '~/Provider/AuthProvider';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const { setPath } = useContext(UserContext);

    //set path
    const location = useLocation();

    useEffect(() => {
        setPath(location.pathname);
    }, [location.pathname]);

    return (
        <ModalProvider>
            <div className={cx('wrapper')}>
                <AuthProvider>
                    <AuthModal />
                </AuthProvider>
                <Header />
                <div className={cx('container')}>
                    <Sidebar />
                    <div className={cx('content')}>{children}</div>
                    {/* <Button rounded text className={cx('float-btn')}>
                    Get app
                </Button> */}
                </div>
            </div>
        </ModalProvider>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
