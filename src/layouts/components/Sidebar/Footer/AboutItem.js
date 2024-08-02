import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function AboutItem({ aboutItem, onClick, idx, isActive }) {
    return (
        <div className={cx('container')}>
            <h4 className={cx('list-header', { active: isActive })} onClick={() => onClick(idx)}>
                {aboutItem.title}
            </h4>
            <div className={cx('list')}>
                {aboutItem.items.map((el, idx) => (
                    <a href="/" key={idx} className={cx('link-item')}>
                        {el}
                    </a>
                ))}
            </div>
        </div>
    );
}

export default AboutItem;
