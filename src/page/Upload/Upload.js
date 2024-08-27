import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import UploadFile from './UploadFile';
import EditFile from './EditFile';

const cx = classNames.bind(styles);

function Upload() {
    let [file, setFile] = useState();
    const videoRef = useRef(null);

    useEffect(() => {
        console.log(file);
        if (file) {
            videoRef.current.src = URL.createObjectURL(
                new Blob([file], { type: 'video/mp4' }),
            );
        }
    }, [file]);

    return (
        <div className={cx('wrapper')}>
            {!file ? (
                <UploadFile setFile={setFile} />
            ) : (
                <EditFile ref={videoRef} />
            )}
        </div>
    );
}

export default Upload;
