import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCommentDots,
    faHeart,
    faPlus,
    faShare,
} from '@fortawesome/free-solid-svg-icons';
import { useRef, createContext, useState } from 'react';
import styles from './Home.module.scss';
import { FavoriteIcon } from '~/components/Icons';
import InfoDialog from './InfoDialog';
import Option from './Option';
import videoSrc from '~/assets/video.mp4';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

export const VideoContext = createContext();

function Video() {
    const videoRef = useRef(null);
    const progressRef = useRef();
    const [isOptionVisible, setIsOptionVisible] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleClick = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    };

    const handleUpdateProgress = () => {
        const curPercent =
            videoRef.current.currentTime / videoRef.current.duration;
        const width = curPercent * videoRef.current.offsetWidth;
        progressRef.current.style.width = `${width}px`;
    };

    return (
        <VideoContext.Provider value={{ videoRef: videoRef }}>
            <div className={cx('video-item-wrapper')}>
                <div className={cx('main-content')}>
                    <div
                        onMouseEnter={() => setIsOptionVisible(true)}
                        onMouseLeave={() => setIsOptionVisible(false)}
                    >
                        <Option visible={isOptionVisible} />
                        <div className={cx('video-container')}>
                            {/* should be custom video component */}
                            <video
                                className={cx('video')}
                                autoPlay
                                muted={false}
                                loop
                                ref={videoRef}
                                onClick={handleClick}
                                onTimeUpdate={handleUpdateProgress}
                            >
                                <source src={videoSrc} type="video/mp4" />
                            </video>
                            <div className={cx('progress-bar')}>
                                <div className={cx('progress')}></div>
                                <div className={cx('point-wrapper')}>
                                    <div className={cx('cur-point')}></div>
                                </div>
                                <div
                                    ref={progressRef}
                                    className={cx('current-percent')}
                                ></div>
                            </div>
                            {/* End */}
                        </div>
                    </div>
                    <div className={cx('action-bar')}>
                        {/* Custom action bar item, default 48px 400px */}
                        <InfoDialog>
                            <div className={cx('user-item')}>
                                <Image
                                    className={cx('avt')}
                                    src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/7340155511947395115~c5_100x100.jpeg?lk3s=a5d48078&nonce=51799&refresh_token=2a01fefefba9fe8e1937d50c0ccc680b&x-expires=1723446000&x-signature=rgRUSusVATNM0rH%2Bluq4TM7QHxU%3D&shp=a5d48078&shcp=81f88b70"
                                    alt=""
                                />
                                <span className={cx('check')}>
                                    {/* Logic for follower and non follower */}
                                    <FontAwesomeIcon
                                        className={cx('check-icon')}
                                        icon={faPlus}
                                    />
                                </span>
                            </div>
                        </InfoDialog>
                        {/* add event here */}
                        <div
                            className={cx('action-item', { active: isLike })}
                            onClick={() => setIsLike(!isLike)}
                        >
                            <span className={cx('icon-wrap', 'like-icon')}>
                                <FontAwesomeIcon
                                    className={cx('icon')}
                                    icon={faHeart}
                                />
                            </span>
                            <span className={cx('item-nums')}>123</span>
                        </div>
                        <div className={cx('action-item')}>
                            <span className={cx('icon-wrap')}>
                                <FontAwesomeIcon
                                    className={cx('icon')}
                                    icon={faCommentDots}
                                />
                            </span>
                            <span className={cx('item-nums')}>123</span>
                        </div>
                        <div
                            className={cx('action-item', {
                                active: isFavorite,
                            })}
                            onClick={() => setIsFavorite(!isFavorite)}
                        >
                            <span className={cx('icon-wrap', 'favorite-icon')}>
                                <FavoriteIcon className={cx('icon')} />
                            </span>
                            <span className={cx('item-nums')}>123</span>
                        </div>
                        <div className={cx('action-item')}>
                            <span className={cx('icon-wrap')}>
                                <FontAwesomeIcon
                                    className={cx('icon')}
                                    icon={faShare}
                                />
                            </span>
                            <span className={cx('item-nums')}>123</span>
                        </div>

                        {/* End */}
                    </div>
                </div>
            </div>
        </VideoContext.Provider>
    );
}

export default Video;
