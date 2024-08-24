import classNames from 'classnames/bind';
import styles from './Toggle.module.scss';

const cx = classNames.bind(styles);

function Toggle({ isActive, onClick, className }) {
    return (
        <div
            className={cx('toggle-btn', {
                active: isActive,
                [className]: className,
            })}
            onClick={onClick}
        >
            <span className={cx('circle', { active: isActive })}></span>
        </div>
    );
}

export default Toggle;
