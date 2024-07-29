import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import Button from '~/components/Button';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
    return (
        <Button
            leftIcon={data.icon}
            to={data.to}
            text
            className={cx('menu-item', { separate: data.separate })}
            onClick={onClick}
        >
            {data.title}
        </Button>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;
