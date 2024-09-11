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
import CheckBox from '~/components/Input/CheckBox';
import Button from '~/components/Button';
import config from '~/config';
import { useAuth } from '~/Provider/AuthProvider';
import httpRequest from '~/utils/httpRequest';
import { UserContext } from '~/Provider/UserProvider';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function SignupContent() {
    const { onCloseModal } = useModal();
    const { setComponent } = useAuth();
    const [info, setInfo] = useState({ username: '', password: '', code: '' });
    const [err, setErr] = useState({
        username: true,
        password: {},
    });
    const [isPassFocus, setIsPassFocus] = useState(false);
    const [isShowPass, setIsShowPass] = useState(false);
    let { setCurUser } = useContext(UserContext);

    const handleNameInput = (e) =>
        setInfo({ ...info, username: e.target.value });
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
    const handleSetCode = (e) => setInfo({ ...info, code: e.target.value });
    const handleNameValidate = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        regex.test(info['username']) || info['username'] === ''
            ? setErr({ ...err, username: true })
            : setErr({ ...err, username: false });
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

        setIsPassFocus(false);
    };
    const handleErrName = () => setErr({ ...err, username: true });
    const handlePassFocus = () => setIsPassFocus(true);
    const isShowPassRequire = (function () {
        if (isPassFocus) return true;
        if (err.password.length === false || err.password.special === false)
            return true;
        return false;
    })();
    const isActiveSendCodeBtn = (function () {
        if (!err.username || !err.password.length || !err.password.special)
            return false;
        return true;
    })();
    const isActiveSubmitBtn = (function () {
        if (isActiveSendCodeBtn) {
            if (info.code.length === 6 && !isNaN(info.code)) return true;
        }
        return false;
    })();
    const toggleShowPass = () => setIsShowPass(!isShowPass);
    const handleSendCode = async () => {
        await httpRequest.post('/auth/verify', {
            email: info.username,
            type: 'auth',
        });
        toast.info('Please check mail to get code');
    };
    const handleSubmitSignUpForm = async () => {
        try {
            const { username, password, code } = info;
            const user = await httpRequest.post(
                '/auth/signup',
                {
                    username,
                    password,
                    code,
                },
                { withCredentials: true },
            );
            onCloseModal();
            setCurUser(user);
        } catch (error) {
            console.log(error);
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
                <h2 className={cx('title')}>Sign up</h2>
                <div className={cx('content-wrapper')}>
                    <span className={cx('content-title')}>Email</span>
                    <input
                        className={cx('input')}
                        type="email"
                        name="username"
                        value={info?.username}
                        placeholder="Email address"
                        onInput={(e) => handleNameInput(e)}
                        onBlur={handleNameValidate}
                        onFocus={handleErrName}
                    />
                    <p
                        className={cx('require-title', 'invalid', {
                            visible: !err?.username,
                        })}
                    >
                        Enter a valid email address
                    </p>
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
                            onFocus={handlePassFocus}
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
                                focus: isPassFocus,
                                visible: true,
                            })}
                        >
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={cx('check-icon', {
                                    valid: err.password.length,
                                })}
                            />
                            8 to 20 characters
                        </p>
                        <p
                            className={cx('require-title', {
                                valid: err.password?.special,
                                invalid: !err.password?.special,
                                focus: isPassFocus,
                                visible: true,
                            })}
                        >
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={cx('check-icon', {
                                    valid: err.password.special,
                                })}
                            />
                            Letters, numbers and special characters
                        </p>
                    </div>
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
                    <p
                        className={cx('require-title', 'invalid', {
                            // visible: true,
                        })}
                    >
                        Verification code is expired or invalid. Try again
                    </p>
                    <div className={cx('notice')}>
                        <CheckBox />
                        <p className={cx('notice-desc')}>
                            Get trending content, newsletters, promotions,
                            recommendations, and account updates sent to your
                            email
                        </p>
                    </div>
                    <Button
                        primary
                        disabled={!isActiveSubmitBtn}
                        className={cx('submit-btn')}
                        onClick={handleSubmitSignUpForm}
                    >
                        Next
                    </Button>
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
                    c and acknowledge that you have read our{' '}
                    <a href="/" className={cx('text-link')}>
                        Privacy Policy
                    </a>
                    .
                </p>
            </div>
            <div className={cx('footer')}>
                <span className={cx('footer-header')}>
                    Already have any account?
                </span>
                <button
                    className={cx('navigate-btn')}
                    onClick={() => setComponent('LoginContent')}
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default SignupContent;
