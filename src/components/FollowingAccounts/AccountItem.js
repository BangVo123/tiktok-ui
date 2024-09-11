import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './FollowingAccounts.module.scss';
import Image from '../Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('account-item')}>
            <Image src={''} alt={''} className={cx('avatar')} />
            <div className={cx('item-info')}>
                <p className={cx('nickname')}>
                    <strong>dongdendidev</strong>
                    <FontAwesomeIcon
                        style={{ fill: '#fff' }}
                        icon={faCheckCircle}
                        className={cx('icon')}
                    />
                </p>
                <p className={cx('name')}>Dong Den Di Dev</p>
            </div>
        </div>
    );
}

export default AccountItem;
