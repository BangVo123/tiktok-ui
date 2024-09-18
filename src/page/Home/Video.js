import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCommentDots,
    faHeart,
    faMusic,
    faPlus,
    faShare,
} from '@fortawesome/free-solid-svg-icons';
import { useRef, createContext, useState, useEffect } from 'react';
import styles from './Home.module.scss';
import { FavoriteIcon } from '~/components/Icons';
import InfoDialog from './InfoDialog';
import Option from './Option';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

export const VideoContext = createContext();

function Video({ video }) {
    let { url, like, favorite, content, comment, share, belong_to } = video;

    const videoRef = useRef(null);
    const progressRef = useRef();
    const titleRef = useRef();
    const compRef = useRef();
    const hasScroll = useRef(false);

    const [isOptionVisible, setIsOptionVisible] = useState(false);
    const [isOverFlow, setIsOverFlow] = useState(false);
    const [isFullTitle, setIsFullTitle] = useState(false);

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
    const handleToggleFullTitle = () => {
        setIsFullTitle(!isFullTitle);
    };

    useEffect(() => {
        //check overflow
        if (titleRef.current.scrollWidth > titleRef.current.clientWidth) {
            setIsOverFlow(true);
        }

        const video = videoRef.current;
        //intersection observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    //auto play when video has 60% height is displayed
                    if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
                        if (!hasScroll.current) {
                            console.log(1);
                            //auto scroll video to center screen
                            entry.target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'end',
                                inline: 'nearest',
                            });
                            // entry.target.scrollIntoView(true);
                            hasScroll.current = true;
                            console.log(2);
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
        <VideoContext.Provider value={{ videoRef: videoRef }}>
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
                                <source src={url} type="video/mp4" />
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
                            <div className={cx('video-title')}>
                                <a href="ahs" className={cx('username')}>
                                    {belong_to.full_name}
                                </a>
                                <p
                                    className={cx('title-wrapper', {
                                        overflow: isFullTitle,
                                    })}
                                >
                                    <span
                                        className={cx('title', {
                                            full: isFullTitle,
                                        })}
                                        ref={titleRef}
                                    >
                                        {content}
                                    </span>
                                    {isOverFlow && (
                                        <span
                                            className={cx('more-btn')}
                                            onClick={handleToggleFullTitle}
                                        >
                                            {isFullTitle ? 'less' : 'more'}
                                        </span>
                                    )}
                                </p>
                                <span className={cx('sound')}>
                                    <span className={cx('sound-icon')}>
                                        <FontAwesomeIcon icon={faMusic} />
                                    </span>
                                    Original sound
                                    {/* Plus with user name */}
                                </span>
                            </div>
                            {/* End */}
                        </div>
                    </div>
                    <div className={cx('action-bar')}>
                        {/* Custom action bar item, default 48px 400px */}
                        <InfoDialog info={video.belong_to}>
                            <div className={cx('user-item')}>
                                <Image
                                    className={cx('avt')}
                                    src={belong_to.avatar}
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
                            <span className={cx('item-nums')}>
                                {isLike ? like + 1 : like}
                            </span>
                        </div>
                        <div className={cx('action-item')}>
                            <span className={cx('icon-wrap')}>
                                <FontAwesomeIcon
                                    className={cx('icon')}
                                    icon={faCommentDots}
                                />
                            </span>
                            <span className={cx('item-nums')}>{comment}</span>
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
                            <span className={cx('item-nums')}>
                                {isFavorite ? favorite + 1 : favorite}
                            </span>
                        </div>
                        <div className={cx('action-item')}>
                            <span className={cx('icon-wrap')}>
                                <FontAwesomeIcon
                                    className={cx('icon')}
                                    icon={faShare}
                                />
                            </span>
                            <span className={cx('item-nums')}>{share}</span>
                        </div>

                        {/* End */}
                    </div>
                </div>
            </div>
        </VideoContext.Provider>
    );
}

export default Video;
