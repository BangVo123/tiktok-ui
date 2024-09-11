import classNames from 'classnames/bind';
import { useState, useContext } from 'react';
import { useModal } from '~/Provider/ModalProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
    faEye,
    faEyeSlash,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import styles from './AuthModal.module.scss';
import Button from '~/components/Button';
import config from '~/config';
import { useAuth } from '~/Provider/AuthProvider';
import httpRequest from '~/utils/httpRequest';
import { UserContext } from '~/Provider/UserProvider';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function ResetPasswordContent() {
    const { onCloseModal } = useModal();
    const { setComponent } = useAuth();
    const [info, setInfo] = useState({ username: '', password: '', code: '' });
    const [err, setErr] = useState({ username: true });
    const [isFocus, setIsFocus] = useState({
        username: false,
        password: false,
    });
    const [isShowPass, setIsShowPass] = useState(false);
    const { setCurUser } = useContext(UserContext);

    const handleNameInput = (e) => {
        setInfo({ ...info, username: e.target.value });
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        e.target.value === '' || regex.test(info?.username)
            ? setErr({ ...err, username: true })
            : setErr({ ...err, username: false });
    };
    const handlePassInput = (e) => {
        const value = e.target.value;
        const newErr = { ...err, password: { ...err.password } };

        setInfo({ ...info, password: value });
        if (value.length > 7) {
            if (value.length > 20) {
                delete newErr.password['length'];
            } else {
                newErr.password.length = true;
            }
        } else newErr.password.length = false;
        if (config.specialCharacterRegex.test(value))
            newErr.password.special = true;
        else newErr.password.special = false;

        setErr(newErr);
    };
    const handleSetCode = (e) => {
        setInfo({ ...info, code: e.target.value });
    };
    const handleNameValidate = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        regex.test(info?.username)
            ? setErr({ ...err, username: true })
            : setErr({ ...err, username: false });
        setIsFocus({ ...isFocus, username: false });
    };
    const handlePassValidate = (e) => {
        if (e.target.value === '') {
            setErr({ username: err.username, password: {} });
        } else {
            const newErr = { ...err, password: { ...err.password } };
            (info['password'].length < 8 && info['password'].length > 1) ||
            info['password'].length > 20
                ? (newErr.password.length = false)
                : (newErr.password.length = true);

            config.specialCharacterRegex.test(info['password'])
                ? (newErr.password.special = true)
                : (newErr.password.special = false);

            setErr(newErr);
        }

        setIsFocus({ ...isFocus, password: false }); //
    };
    const handleErrName = () => {
        setIsFocus({ ...isFocus, username: true });
    };
    const handlePassFocus = () => {
        setIsFocus({ ...isFocus, password: true }); //
    };
    const isShowPassRequire = (function () {
        if (isFocus.password) return true; //
        if (err.password?.length === false || err.password?.special === false)
            return true;
        return false;
    })();
    const isActiveSendCodeBtn = (function () {
        if (!err.username || info.username === '') return false;
        return true;
    })();
    const isActiveSubmitBtn = (function () {
        if (isActiveSendCodeBtn) {
            if (info.code.length === 6 && !isNaN(info.code)) return true;
        }
        return false;
    })();
    const toggleShowPass = () => {
        setIsShowPass(!isShowPass);
    };
    const handleSendCode = async () => {
        await httpRequest.post('/auth/verify', {
            email: info.username,
            type: 'reset',
        });
        toast.info('Please check mail to get code');
    };
    const handleSubmitResetPassForm = async () => {
        const { username, password, code } = info;
        try {
            const user = await httpRequest.post(
                '/auth/reset',
                { username, password, code },
                { withCredentials: true },
            );
            setComponent('AuthContent');
            setCurUser(user);
            onCloseModal();
        } catch (err) {
            console.log(err);
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
                <h2 className={cx('title')}>Reset password</h2>
                <div className={cx('content-wrapper')}>
                    <span className={cx('content-title')}>
                        Enter email address
                    </span>
                    <input
                        className={cx('input')}
                        type="email"
                        name="username"
                        value={info?.username}
                        placeholder="Email address"
                        autoFocus
                        onInput={(e) => handleNameInput(e)}
                        onBlur={handleNameValidate}
                        onFocus={handleErrName}
                    />
                    <p
                        className={cx('require-title', 'invalid', {
                            visible: !err?.username && !isFocus.username,
                        })}
                    >
                        Enter a valid email address
                        {/* Email address is not resister yet */}
                    </p>
                    <div className={cx('group')}>
                        <input
                            className={cx('input', 'input-with-btn')}
                            type="text"
                            name="code"
                            onInput={(e) => handleSetCode(e)}
                            placeholder="Enter 6-digit code"
                        />
                        <button
                            className={cx('btn-send-code')}
                            disabled={!isActiveSendCodeBtn}
                            onClick={handleSendCode}
                        >
                            Send code
                        </button>
                    </div>
                    <div className={cx('group')}>
                        <input
                            className={cx(
                                'input',
                                'input-with-btn',
                                'pass-input',
                            )}
                            type={isShowPass ? 'text' : 'password'}
                            name="password"
                            value={info?.password}
                            placeholder="Password"
                            onInput={(e) => handlePassInput(e)}
                            onBlur={(e) => handlePassValidate(e)}
                            onFocus={handlePassFocus} //
                        />
                        <span
                            className={cx('show-pass-wrapper')}
                            onClick={toggleShowPass}
                        >
                            <FontAwesomeIcon
                                className={cx('show-pass-icon')}
                                icon={isShowPass ? faEye : faEyeSlash}
                            />
                        </span>
                    </div>
                    <div
                        className={cx('password-require', {
                            visible: isShowPassRequire,
                            // visible: true,
                        })}
                    >
                        <strong className={cx('require-header')}>
                            Your password must have:
                        </strong>
                        <p
                            className={cx('require-title', {
                                valid: err.password?.length,
                                invalid: !err.password?.length,
                                focus: isFocus.password,
                                visible: true,
                            })}
                        >
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={cx('check-icon', {
                                    valid: err.password?.length,
                                })}
                            />
                            8 to 20 characters
                        </p>
                        <p
                            className={cx('require-title', {
                                valid: err.password?.special,
                                invalid: !err.password?.special,
                                focus: isFocus.password,
                                visible: true,
                            })}
                        >
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={cx('check-icon', {
                                    valid: err.password?.special,
                                })}
                            />
                            Letters, numbers and special characters
                        </p>
                    </div>
                    <p
                        className={cx('require-title', 'invalid', {
                            // visible: true,
                        })}
                    >
                        Verification code is expired or invalid. Try again
                    </p>
                    <Button
                        primary
                        disabled={!isActiveSubmitBtn}
                        className={cx('submit-btn')}
                        onClick={handleSubmitResetPassForm}
                    >
                        Login
                    </Button>
                </div>
            </div>
            <div className={cx('footer')}>
                <span className={cx('footer-header')}>
                    Don't have an account?
                </span>
                <button
                    className={cx('navigate-btn')}
                    onClick={() => setComponent('SignupContent')}
                >
                    Sign up
                </button>
            </div>
        </div>
    );
}

export default ResetPasswordContent;
