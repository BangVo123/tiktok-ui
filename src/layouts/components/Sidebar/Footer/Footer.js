import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import Image from '~/components/Image';
import images from '~/assets/images';
import About from './About';
import config from '~/config';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <button className={cx('banner-btn')}>
                    <Image src={images.banner} alt="" className={cx('img')} />
                </button>
            </div>
            <div className={cx('about')}>
                <About />
            </div>
            <span className={cx('copyright')}>© 2024 TikTok</span>
        </div>
    );
}

export default Footer;
