import { useState, forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import Button from '~/components/Button';
import {
    DefaultGroupUserIcon,
    DefaultHomeIcon,
    InboxIcon,
    UserIcon,
} from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Preview(props, ref) {
    const [option, setOption] = useState('Feed');
    const handleSetOption = (e) => {
        setOption(e.target.innerText);
        alert('This function does not support now');
    };

    return (
        <div className={cx('preview-container')}>
            <div className={cx('preview-option')}>
                <Button
                    className={cx('btn')}
                    text={option !== 'Feed'}
                    outline={option === 'Feed'}
                    onClick={(e) => handleSetOption(e)}
                >
                    Feed
                </Button>
                <Button
                    className={cx('btn')}
                    text={option !== 'Profile'}
                    outline={option === 'Profile'}
                    onClick={(e) => handleSetOption(e)}
                >
                    Profile
                </Button>
                <Button
                    className={cx('btn')}
                    text={option !== 'Web/TV'}
                    outline={option === 'Web/TV'}
                    onClick={(e) => handleSetOption(e)}
                >
                    Web/TV
                </Button>
            </div>
            <div className={cx('main-preview')}>
                <div className={cx('device')}>
                    <div className={cx('camera')}>
                        <span className={cx('point')}>
                            <span className={cx('circle')}></span>
                        </span>
                    </div>
                    <div className={cx('video-wrapper')}>
                        <video
                            src=""
                            ref={ref}
                            autoPlay
                            loop
                            muted={false}
                            className={cx('video')}
                        />
                    </div>
                    <div className={cx('control-container')}>
                        <span className={cx('control-item')}>
                            <DefaultHomeIcon className={cx('control-icon')} />
                            <p>Home</p>
                        </span>
                        <span className={cx('control-item')}>
                            <DefaultGroupUserIcon
                                className={cx('control-icon')}
                            />
                            <p>Friends</p>
                        </span>
                        <span className={cx('control-item')}>
                            <span className={cx('item-wrapper')}>
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className={cx('control-icon')}
                                />
                            </span>
                        </span>
                        <span className={cx('control-item')}>
                            <InboxIcon className={cx('control-icon')} />
                            <p>Inbox</p>
                        </span>
                        <span className={cx('control-item')}>
                            <UserIcon className={cx('control-icon')} />
                            <p>Me</p>
                        </span>
                    </div>
                </div>
            </div>
            <span className={cx('btn-wrapper')}>
                <Button normal className={cx('btn')}>
                    Edit video
                </Button>
            </span>
        </div>
    );
}

export default forwardRef(Preview);
