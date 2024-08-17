import classNames from 'classnames/bind';
import styles from './AuthModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Button from '../../Button';
import config from '~/config';

const cx = classNames.bind(styles);

function Modal({ isOpen, onCloseModal }) {
    const [isHandleLogin, setIsHandleLogin] = useState(true);
    let { header, listBtn, footerTitle, navigateBtn } = config.auth.login;

    const handleChange = () => {
        if (isHandleLogin) {
            ({ header, listBtn, footerTitle, navigateBtn } = config.auth.signup);
            setIsHandleLogin(false);
        } else {
            ({ header, listBtn, footerTitle, navigateBtn } = config.auth.login);
            setIsHandleLogin(true);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('overlay')}></div>
            <div className={cx('body')}>
                <div className={cx('content')}>
                    <button className={cx('close-btn')} onClick={onCloseModal}>
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
                                        onClick={btn.onclick}
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
            </div>
        </div>
    );
}

export default Modal;
