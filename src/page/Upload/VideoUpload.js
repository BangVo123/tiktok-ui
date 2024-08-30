import { useRef } from 'react';
import classNames from 'classnames/bind';
import { CloudUp } from '~/components/Icons';
import styles from './Upload.module.scss';
import Button from '~/components/Button';
import config from '~/config';

const cx = classNames.bind(styles);

function VideoUpload({ setFile, full = true, cb = () => {} }) {
    const inputRef = useRef();

    const triggerInputClick = () => {
        inputRef.current.click();
    };

    return (
        <div className={cx('content')}>
            <input
                type="file"
                accept="video/*"
                ref={inputRef}
                style={{ display: 'none' }}
                onChange={() => {
                    setFile(inputRef.current.files[0]);
                    cb();
                }}
            />
            <div
                className={cx('upload', { 'flex-box': !full })}
                onClick={triggerInputClick}
            >
                <CloudUp />
                <span className={cx('title-wrapper')}>
                    <strong className={cx('header')}>
                        Select video to upload
                    </strong>
                    <span className={cx('header-title')}>
                        Or drag and drop it here
                    </span>
                </span>
                {full ? (
                    <Button primary className={cx('btn-select')}>
                        Select video
                    </Button>
                ) : null}
            </div>
            {full ? (
                <div className={cx('info')}>
                    {config.uploadInfo.map((el, idx) => (
                        <div className={cx('info-wrapper')} key={idx}>
                            <span className={cx('icon')}>{el.icon}</span>
                            <div className={cx('content')}>
                                <strong className={cx('content-header')}>
                                    {el.header}
                                </strong>
                                <span className={cx('content-desc')}>
                                    {el.desc}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

export default VideoUpload;
