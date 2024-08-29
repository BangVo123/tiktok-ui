import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import UploadFile from './UploadFile';
import EditFile from './EditFile';

const cx = classNames.bind(styles);

function Upload() {
    let [file, setFile] = useState();

    return (
        <div className={cx('wrapper')}>
            {!file ? (
                <UploadFile setFile={setFile} />
            ) : (
                <EditFile file={file} />
            )}
        </div>
    );
}

export default Upload;
