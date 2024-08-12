import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './Home.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function InfoDialog({ children }) {
    return (
        <div>
            <HeadlessTippy
                interactive
                delay={[500, 500]}
                placement="bottom-start"
                offset={[0, 20]}
                render={() => (
                    <div className={cx('tippy-wrapper')}>
                        <header className={cx('header')}>
                            <Image src="a" alt="" className={cx('tippy-avt')} />
                            <Button outline>Follow</Button>
                        </header>
                        <div className={cx('body')}>
                            <span className={cx('user-name')}>Username</span>
                            <span className={cx('name')}>Name</span>

                            <div className={cx('info')}>
                                <span className={cx('tippy-nums')}>123</span>
                                <span className={cx('info-header')}>Followers</span>
                                <span className={cx('tippy-nums')}>13456</span>
                                <span className={cx('info-header')}>Likes</span>
                            </div>
                        </div>
                        <footer className={cx('footer')}>
                            <div className={cx('bio')}>Clash of clan</div>
                        </footer>
                    </div>
                )}
            >
                {children}
            </HeadlessTippy>
        </div>
    );
}

export default InfoDialog;
