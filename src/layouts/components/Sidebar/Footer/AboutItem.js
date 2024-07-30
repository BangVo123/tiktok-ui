import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function AboutItem({ aboutItem }) {
    const [curActive, setCurActive] = useState(false);
    const handleClick = () => setCurActive(!curActive);

    return (
        <div className={cx('container')}>
            <h4 className={cx('list-header', { active: curActive })} onClick={handleClick}>
                {aboutItem.title}
            </h4>
            <div className={cx('list')}>
                {aboutItem.items.map((el, idx) => (
                    <a href="" key={idx} className={cx('link-item')}>
                        {el}
                    </a>
                ))}
            </div>
        </div>
    );
}

export default AboutItem;
