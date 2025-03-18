import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ data, className }) {
    return (
        <Link to={`/:${data.nickname}`} className={cx('wrapper', [className])}>
            <Image className={cx('avatar')} src={data.avatar} alt="" />
            <div className={cx('info')}>
                <div className={cx('container')}>
                    <h4 className={cx('name')}>{data.full_name}</h4>
                    {data.tick && (
                        <FontAwesomeIcon
                            icon={faCheckCircle}
                            className={cx('check')}
                        />
                    )}
                </div>
                <span className={cx('username')}>{data.nickname}</span>
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
