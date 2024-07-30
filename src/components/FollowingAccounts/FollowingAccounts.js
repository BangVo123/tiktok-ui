import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './FollowingAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function FollowingAccounts({ lable }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('lable')}>{lable}</p>
            <AccountItem />
            <AccountItem />
            <AccountItem />

            <p className={cx('more-btn')}>See more</p>
        </div>
    );
}

FollowingAccounts.propTypes = {
    lable: PropTypes.string.isRequired,
};

export default FollowingAccounts;
