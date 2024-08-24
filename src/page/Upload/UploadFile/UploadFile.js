import { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './UploadFile.module.scss';
import { CapCutIcon } from '~/components/Icons';
import Button from '~/components/Button';
import VideoUpload from '../VideoUpload';

const cx = classNames.bind(styles);

function UploadFile({ setFile }) {
    const inputRef = useRef();

    const onInput = () => {
        inputRef.current.click();
    };
    const handleGetData = () => {
        setFile({ ...inputRef.current.files });
    };

    return (
        <>
            <div className={cx('container')}>
                <VideoUpload
                    ref={inputRef}
                    handleGetData={handleGetData}
                    onInput={onInput}
                />
            </div>
            <div className={cx('advance')}>
                <div className={cx('advance-content')}>
                    <header className={cx('advance-header')}>
                        Create high quality videos on CapCut Online
                    </header>
                    <p className={cx('advance-title')}>
                        Automatically shorten your videos and create videos from
                        scripts with AI-powered features.
                    </p>
                </div>
                <Button leftIcon={<CapCutIcon />} className={cx('advance-btn')}>
                    Try now
                </Button>
            </div>
        </>
    );
}

export default UploadFile;
