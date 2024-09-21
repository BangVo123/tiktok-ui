import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCommentDots,
    faHeart,
    faMusic,
    faPlus,
    faShare,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useRef, createContext, useState, useEffect, useContext } from 'react';
import styles from './Home.module.scss';
import { FavoriteIcon } from '~/components/Icons';
import InfoDialog from './InfoDialog';
import Option from './Option';
import Image from '~/components/Image';
import httpRequest from '~/utils/httpRequest';
import { UserContext } from '~/Provider/UserProvider';

const cx = classNames.bind(styles);

export const VideoContext = createContext();

function Video({ video }) {
    const { favorite, setFavorite } = useContext(UserContext);

    const videoInfoRef = useRef(video);
    const videoRef = useRef(null);
    const progressRef = useRef();
    const titleRef = useRef();
    const compRef = useRef();
    const hasScroll = useRef(false);

    const [isOptionVisible, setIsOptionVisible] = useState(false);
    const [isOverFlow, setIsOverFlow] = useState(false);
    const [isFullTitle, setIsFullTitle] = useState(false);

    const [isLike, setIsLike] = useState(false);
    const [isLove, setIsLove] = useState(false);

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
    const handleSetLike = async () => {
        try {
            const likeRes = await httpRequest.post(
                `/video/like/${videoInfoRef.current._id}`,
                {},
                { withCredentials: true },
            );
            if (likeRes.status >= 200 && likeRes.status < 300) {
                setFavorite((prev) => ({
                    ...prev,
                    likes: [...prev.likes, video.id],
                }));
                if (!isLike) {
                    videoInfoRef.current.like = videoInfoRef.current.like + 1;
                    setIsLike(true);
                } else {
                    videoInfoRef.current.like = videoInfoRef.current.like - 1;
                    setIsLike(false);
                }
            } else {
                toast.error('Something went wrong');
            }
        } catch (err) {
            console.log(err);
        }
    };
    const handleSetLove = async () => {
        try {
            console.log(videoInfoRef.current._id);
            const loveRes = await httpRequest.post(
                `/video/love/${videoInfoRef.current._id}`,
                {},
                { withCredentials: true },
            );
            console.log(loveRes);
            if (loveRes.status >= 200 && loveRes.status < 300) {
                setFavorite((prev) => ({
                    ...prev,
                    loves: [...prev.loves, video.id],
                }));
                if (!isLove) {
                    videoInfoRef.current.love = videoInfoRef.current.love + 1;
                    setIsLove(true);
                } else {
                    videoInfoRef.current.love = videoInfoRef.current.love - 1;
                    setIsLove(false);
                }
            } else {
                toast.error('Something went wrong');
            }
        } catch (err) {
            console.log(err);
        }
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

    useEffect(() => {
        // console.log(favorite);
        // console.log(video);
        if (favorite?.likes.includes(video._id)) {
            setIsLike(true);
        }
        if (favorite?.loves.includes(video._id)) {
            setIsLove(true);
        }
    }, [favorite?.likes, favorite.loves]);

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
                            <div className={cx('video-title')}>
                                <a href="ahs" className={cx('username')}>
                                    {videoInfoRef.current.belong_to.full_name}
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
                                        {videoInfoRef.current.content}
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
                        <InfoDialog info={videoInfoRef.current.belong_to}>
                            <div className={cx('user-item')}>
                                <Image
                                    className={cx('avt')}
                                    src={videoInfoRef.current.belong_to.avatar}
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
                            onClick={(e) => handleSetLike(e)}
                        >
                            <span className={cx('icon-wrap', 'like-icon')}>
                                <FontAwesomeIcon
                                    className={cx('icon')}
                                    icon={faHeart}
                                />
                            </span>
                            <span className={cx('item-nums')}>
                                {/* {isLike ? like + 1 : like} */}
                                {videoInfoRef.current.like}
                            </span>
                        </div>
                        <div className={cx('action-item')}>
                            <span className={cx('icon-wrap')}>
                                <FontAwesomeIcon
                                    className={cx('icon')}
                                    icon={faCommentDots}
                                />
                            </span>
                            <span className={cx('item-nums')}>
                                {videoInfoRef.current.comment}
                            </span>
                        </div>
                        <div
                            className={cx('action-item', {
                                active: isLove,
                            })}
                            onClick={(e) => handleSetLove(e)}
                        >
                            <span className={cx('icon-wrap', 'favorite-icon')}>
                                <FavoriteIcon className={cx('icon')} />
                            </span>
                            <span className={cx('item-nums')}>
                                {/* {isLove ? favorite + 1 : favorite} */}
                                {videoInfoRef.current.love}
                            </span>
                        </div>
                        <div className={cx('action-item')}>
                            <span className={cx('icon-wrap')}>
                                <FontAwesomeIcon
                                    className={cx('icon')}
                                    icon={faShare}
                                />
                            </span>
                            <span className={cx('item-nums')}>
                                {videoInfoRef.current.share}
                            </span>
                        </div>

                        {/* End */}
                    </div>
                </div>
            </div>
        </VideoContext.Provider>
    );
}

export default Video;
