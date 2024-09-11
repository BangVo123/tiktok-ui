import classNames from 'classnames/bind';
import styles from './AuthModal.module.scss';
import { useModal } from '~/Provider/ModalProvider';
import { useAuth } from '~/Provider/AuthProvider';

const cx = classNames.bind(styles);

function Modal() {
    const { isOpen } = useModal();
    const { component } = useAuth();

    if (!isOpen) return null;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('overlay')}></div>
            <div className={cx('body')}>{component}</div>
        </div>
    );
}

export default Modal;
