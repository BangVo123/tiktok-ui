import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { useRef } from 'react';

const cx = classNames.bind(styles);

function Video({ src }) {
    const videoRef = useRef();

    const handlePlayVideo = () => {
        videoRef.current.play();
    };
    const handlePauseVideo = () => {
        videoRef.current.pause();
    };

    return (
        <div className={cx('wrapper')}>
            <video
                onMouseEnter={handlePlayVideo}
                onMouseLeave={handlePauseVideo}
                ref={videoRef}
            >
                <source src={src} type="video/mp4" />
            </video>
        </div>
    );
}

export default Video;
