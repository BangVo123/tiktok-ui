import classNames from 'classnames/bind';
import styles from './ConfirmModal.module.scss';
import Button from '../../Button';

const cx = classNames.bind(styles);

function ConfirmModal({ isOpen, handleCancel, handleAccept, content }) {
    if (!isOpen) return null;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('overlay')}></div>
            <div className={cx('body')}>
                <div className={cx('content')}>
                    <div className={cx('content-wrapper')}>
                        <div className={cx('title')}>{content}</div>
                        <div className={cx('btn-group')}>
                            <Button
                                className={cx('btn', 'cancel-btn')}
                                normal
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                className={cx('btn')}
                                outline
                                onClick={handleAccept}
                            >
                                Log out
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
