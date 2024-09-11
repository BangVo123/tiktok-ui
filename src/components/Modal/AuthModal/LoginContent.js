import classNames from 'classnames/bind';
import { useState, useContext } from 'react';
import { useModal } from '~/Provider/ModalProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './AuthModal.module.scss';
import Button from '~/components/Button';
import { useAuth } from '~/Provider/AuthProvider';
import httpRequest from '~/utils/httpRequest';
import { UserContext } from '~/Provider/UserProvider';

const cx = classNames.bind(styles);

function LoginContent() {
    const { onCloseModal } = useModal();
    const { setComponent } = useAuth();
    const [info, setInfo] = useState({ username: '', password: '' });
    const [isShowPass, setIsShowPass] = useState(false);
    const { setCurUser } = useContext(UserContext);

    const handleNameInput = (e) => {
        setInfo({ ...info, username: e.target.value });
    };
    const handlePassInput = (e) => {
        setInfo({ ...info, password: e.target.value });
    };
    const toggleShowPass = () => setIsShowPass(!isShowPass);
    const handleSetForgotComp = () => setComponent('ResetPasswordContent');
    const handleSetSignUpComp = () => setComponent('SignupContent');
    const handleSubmitLoginForm = async () => {
        const { username, password } = info;
        try {
            const user = await httpRequest.post(
                '/auth/login',
                { username, password },
                { withCredentials: true },
            );
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
                <h2 className={cx('title')}>Log in</h2>
                <div className={cx('content-wrapper')}>
                    <span className={cx('content-title')}>Email</span>
                    <input
                        className={cx('input')}
                        type="email"
                        name="username"
                        placeholder="Email"
                        value={info?.username}
                        onInput={(e) => handleNameInput(e)}
                    />
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

                    <button
                        className={cx('text-btn')}
                        onClick={handleSetForgotComp}
                    >
                        Forgot password?
                    </button>
                    <Button
                        primary
                        onClick={handleSubmitLoginForm}
                        className={cx('submit-btn')}
                    >
                        Log in
                    </Button>
                </div>
            </div>
            <div className={cx('footer')}>
                <span className={cx('footer-header')}>
                    Don't have any an account?
                </span>
                <button
                    className={cx('navigate-btn')}
                    onClick={handleSetSignUpComp}
                >
                    Sign up
                </button>
            </div>
        </div>
    );
}

export default LoginContent;
