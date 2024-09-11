import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
import styles from './AuthModal.module.scss';
import Button from '~/components/Button';
import { useModal } from '~/Provider/ModalProvider';
import { useAuth } from '~/Provider/AuthProvider';

const cx = classNames.bind(styles);

function AuthContent() {
    const [isHandleLogin, setIsHandleLogin] = useState(true);
    const [authConfig, setAuthConfig] = useState(config.auth.login);

    const handleChange = () => {
        if (isHandleLogin) {
            setAuthConfig(config.auth.signup);
            setIsHandleLogin(false);
        } else {
            setAuthConfig(config.auth.login);
            setIsHandleLogin(true);
        }
    };
    const { header, listBtn, footerTitle, navigateBtn } = authConfig;
    const { onCloseModal } = useModal();
    const { setComponent } = useAuth();
    const handleLocalAuth = () => {
        if (isHandleLogin) {
            setComponent('LoginContent');
        } else {
            setComponent('SignupContent');
        }
    };

    return (
        <div className={cx('content')}>
            <button
                className={cx('close-btn')}
                onClick={() => {
                    onCloseModal();
                    setComponent('AuthContent');
                }}
            >
                <FontAwesomeIcon icon={faXmark} className={cx('close-icon')} />
            </button>

            <div className={cx('container')}>
                <h2 className={cx('title')}>{header}</h2>
                <div className={cx('list-btn')}>
                    {listBtn.map((btn, idx) => {
                        const Icon = btn.Icon;
                        return (
                            <Button
                                key={idx}
                                auth
                                leftIcon={<Icon />}
                                className={cx('btn')}
                                onClick={btn?.onclick || handleLocalAuth}
                            >
                                {btn.title}
                            </Button>
                        );
                    })}
                </div>
                <p className={cx('text-content')}>
                    By continuing with an account located in{' '}
                    <a href="/" className={cx('text-link')}>
                        Vietnam
                    </a>
                    , you agree to our{' '}
                    <a href="/" className={cx('text-link')}>
                        Terms of Service
                    </a>{' '}
                    and acknowledge that you have read our{' '}
                    <a href="/" className={cx('text-link')}>
                        Privacy Policy
                    </a>
                    .
                </p>
            </div>

            <div className={cx('footer')}>
                <span className={cx('footer-header')}>{footerTitle}</span>
                <button className={cx('navigate-btn')} onClick={handleChange}>
                    {navigateBtn}
                </button>
            </div>
        </div>
    );
}

export default AuthContent;
