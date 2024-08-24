import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import UploadFile from './UploadFile';
import EditFile from './EditFile';

const cx = classNames.bind(styles);

function Upload() {
    let [file, setFile] = useState({});

    return (
        <div className={cx('wrapper')}>
            {Object.keys(file).length !== 0 ? (
                <UploadFile setFile={setFile} />
            ) : (
                <EditFile />
            )}
        </div>
    );
}

export default Upload;
