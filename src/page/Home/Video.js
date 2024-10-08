import classNames from 'classnames/bind';
import { useRef, createContext, useState, useEffect, memo } from 'react';
import styles from './Home.module.scss';
import Option from './Option';
import VideoTitle from './VideoTitle';
import VideoActionBar from './VideoActionBar';

const cx = classNames.bind(styles);

export const VideoContext = createContext();

function Video({ video }) {
    const videoInfoRef = useRef(video);
    const videoRef = useRef(null);
    const progressRef = useRef();
    const compRef = useRef();
    const hasScroll = useRef(false);

    const [isOptionVisible, setIsOptionVisible] = useState(false);

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

    useEffect(() => {
        const video = videoRef.current;
        //intersection observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    //auto play when video has 60% height is displayed
                    if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
                        if (!hasScroll.current) {
                            //auto scroll video to center screen
                            entry.target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'end',
                                inline: 'nearest',
                            });
                            // entry.target.scrollIntoView(true);
                            hasScroll.current = true;
                        }

                        if (video.paused || video.ended) {
                            video.play();
                        }
                    } else {
                        if (!video.paused) {
                            video.pause();
                        }
                        hasScroll.current = false;
                    }
                });
            },
            {
                threshold: 0.6,
            },
        );

        if (compRef.current) {
            observer.observe(compRef.current);
        }

        return () => {
            if (compRef.current) {
                observer.unobserve(compRef.current);
            }
        };
    }, [compRef.current]);

    return (
        <VideoContext.Provider value={{ videoRef: videoRef, videoInfo: video }}>
            <div className={cx('video-item-wrapper')} ref={compRef}>
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
                                muted={false}
                                loop
                                ref={videoRef}
                                onClick={handleClick}
                                onTimeUpdate={handleUpdateProgress}
                            >
                                <source
                                    src={videoInfoRef.current.url}
                                    type="video/mp4"
                                />
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
                            <VideoTitle
                                name={videoInfoRef.current.belong_to.full_name}
                                title={videoInfoRef.current.content}
                            />
                        </div>
                    </div>
                    <VideoActionBar />
                </div>
            </div>
        </VideoContext.Provider>
    );
}

export default memo(Video);
