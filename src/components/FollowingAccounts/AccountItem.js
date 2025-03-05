import classNames from 'classnames/bind';

import styles from './FollowingAccounts.module.scss';
import Image from '../Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AccountItem({ avt = '', fullname, tick }) {
    return (
        <div className={cx('account-item')}>
            <Image src={avt} alt={''} className={cx('avatar')} />
            <div className={cx('item-info')}>
                <p className={cx('nickname')}>
                    <strong>{fullname}</strong>
                    {tick && (
                        <FontAwesomeIcon
                            style={{ fill: '#fff' }}
                            icon={faCheckCircle}
                            className={cx('icon')}
                        />
                    )}
                </p>
                <p className={cx('name')}>{fullname}</p>
            </div>
        </div>
    );
}

export default AccountItem;
