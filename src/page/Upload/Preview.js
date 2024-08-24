import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Preview() {
    return (
        <div className={cx('preview-container')}>
            <div className={cx('preview-option')}>
                <Button className={cx('btn')} outline>
                    Feed
                </Button>
                <Button className={cx('btn')} text>
                    Profile
                </Button>
                <Button className={cx('btn')} text>
                    Web/TV
                </Button>
            </div>
            <div className={cx('main-preview')}>
                <div className={cx('device')}></div>
            </div>
            <span className={cx('btn-wrapper')}>
                <Button normal className={cx('btn')}>
                    Edit video
                </Button>
            </span>
        </div>
    );
}

export default Preview;
