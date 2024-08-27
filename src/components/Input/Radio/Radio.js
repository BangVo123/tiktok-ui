import classNames from 'classnames/bind';
import styles from './Radio.module.scss';

const cx = classNames.bind(styles);

function Radio({ label, name, current, onClick, className }) {
    return (
        <label className={cx('container', { [className]: className })}>
            {label}
            <input
                type="radio"
                className={cx('input')}
                name={name}
                defaultChecked={current === label}
                onClick={onClick}
                value={label}
            />
            <span className={cx('checkmark')}></span>
        </label>
    );
}

export default Radio;
