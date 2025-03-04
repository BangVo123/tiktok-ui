import classNames from 'classnames/bind';
import {
    useRef,
    createContext,
    useState,
    useEffect,
    useContext,
    memo,
} from 'react';
import styles from './Video.module.scss';
import Option from '../VideoOptions/Option';
import VideoTitle from '../VideoTitle/VideoTitle';
import VideoActionBar from '../VideoActionBar';
import Comment from '../Comment/Comment';
import { useUser } from '~/Provider/UserProvider';
import { useModal } from '~/Provider/ModalProvider';

const cx = classNames.bind(styles);

const VideoContext = createContext();
export const useVideo = () => useContext(VideoContext);

function Video({ video }) {
    const { socketInstance, isAuthenticate } = useUser();
    const { onOpenModal } = useModal();
    const videoRef = useRef(null);
    const progressRef = useRef();
    const compRef = useRef();
    const hasScroll = useRef(false);

    const [isOptionVisible, setIsOptionVisible] = useState(false);
    const [isShowComment, setIsShowComment] = useState(false);

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
    const handleToggleComment = async () => {
        if (!isAuthenticate) {
            onOpenModal();
            return;
        }

        if (isShowComment) {
            socketInstance.current.emit('leave', video._id);
        } else {
            socketInstance.current.emit('join', video._id);
        }
        setIsShowComment((prev) => !prev);
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
        <VideoContext.Provider
            value={{
                videoRef: videoRef,
                videoInfo: video,
            }}
        >
            <div className={cx('video-item-wrapper')} ref={compRef}>
                <div className={cx('main-content')}>
                    <div
                        onMouseEnter={() => setIsOptionVisible(true)}
                        onMouseLeave={() => setIsOptionVisible(false)}
                    >
                        <Option visible={isOptionVisible} />
                        <div className={cx('video-container')}>
                            <video
                                className={cx('video')}
                                muted={false}
                                loop
                                ref={videoRef}
                                onClick={handleClick}
                                onTimeUpdate={handleUpdateProgress}
                            >
                                <source
                                    src={video?.url || ''}
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
                                name={video?.belong_to.full_name || ''}
                                title={video?.content || ''}
                            />
                        </div>
                    </div>
                    <VideoActionBar handleToggleComment={handleToggleComment} />
                </div>
                {isShowComment && (
                    <Comment
                        handleToggleComment={handleToggleComment}
                        numsComment={video.comment}
                    />
                )}
            </div>
        </VideoContext.Provider>
    );
}

export default memo(Video);
