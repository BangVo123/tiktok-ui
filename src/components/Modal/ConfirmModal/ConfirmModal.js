import classNames from 'classnames/bind';
import { useContext } from 'react';
import { UserContext } from '~/Provider/UserProvider';
import styles from './ConfirmModal.module.scss';
import Button from '../../Button';
import httpRequest from '~/utils/httpRequest';

const cx = classNames.bind(styles);

function ConfirmModal({ isOpen, handleCancel }) {
    const { setCurUser } = useContext(UserContext);

    const handleAccept = async () => {
        // call api to logout here
        try {
            await httpRequest.get('/auth/logout', { withCredentials: true });
            //set curUser = null t reload page, hide confirm dialog
            setCurUser({});
            handleCancel();
        } catch (err) {
            console.log(err);
        }
    };

    if (!isOpen) return null;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('overlay')}></div>
            <div className={cx('body')}>
                <div className={cx('content')}>
                    <div className={cx('content-wrapper')}>
                        <div className={cx('title')}>Are you sure you want to log out?</div>
                        <div className={cx('btn-group')}>
                            <Button
                                className={cx('btn', 'cancel-btn')}
                                normal
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button className={cx('btn')} outline onClick={handleAccept}>
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
