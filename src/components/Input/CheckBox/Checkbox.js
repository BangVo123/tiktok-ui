import classNames from 'classnames/bind';
import styles from './Checkbox.module.scss';

const cx = classNames.bind(styles);

function Checkbox({ label, checked, className }) {
    return (
        <label className={cx('container', { [className]: className })}>
            {label}
            <input
                type="checkbox"
                className={cx('input')}
                value={label}
                defaultChecked={checked}
            />
            <span className={cx('checkmark')}></span>
        </label>
    );
}

export default Checkbox;
