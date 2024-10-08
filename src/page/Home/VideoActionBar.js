import { useState, useEffect, useContext, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import {
    faCheck,
    faCommentDots,
    faHeart,
    faPlus,
    faShare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InfoDialog from './InfoDialog';
import Image from '~/components/Image';
import { FavoriteIcon } from '~/components/Icons';
import httpRequest from '~/utils/httpRequest';
import { UserContext } from '~/Provider/UserProvider';
import { VideoContext } from './Video';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function VideoActionBar() {
    const { favorite, curUser, follow, setFollow } = useContext(UserContext);
    const { videoInfo } = useContext(VideoContext);

    const [isLike, setIsLike] = useState(false);
    const [isLove, setIsLove] = useState(false);
    const [isFollow, setIsFollow] = useState(false);

    const debouncedLikeValue = useDebounce(isLike, 500);
    const debouncedLoveValue = useDebounce(isLove, 500);

    const handleSetLike = () => {
        if (isLike) {
            videoInfo.like = videoInfo.like - 1;
            setIsLike(false);
        } else {
            videoInfo.like = videoInfo.like + 1;
            setIsLike(true);
        }
    };
    const handleSetLove = () => {
        if (isLove) {
            videoInfo.love = videoInfo.love - 1;
            setIsLove(false);
        } else {
            videoInfo.love = videoInfo.love + 1;
            setIsLove(true);
        }
    };
    const handleFollow = async () => {
        const res = await httpRequest.post(
            '/follow',
            { followingId: videoInfo.belong_to._id },
            { withCredentials: true },
        );
        if (res.status < 300) {
            if (isFollow) {
                setFollow((prev) => {
                    return prev.filter((el) => el !== videoInfo.belong_to._id);
                });
            } else {
                setFollow((prev) => [...prev, videoInfo.belong_to._id]);
            }
            setIsFollow((prev) => !prev);
        }
    };

    useEffect(() => {
        if (favorite.likes.includes(videoInfo._id)) {
            setIsLike(true);
        }
        if (favorite.loves.includes(videoInfo._id)) {
            setIsLove(true);
        }
        if (follow.includes(videoInfo.belong_to._id)) {
            setIsFollow(true);
        }
    }, [favorite, follow]);

    const handleEmotion = async ({ path, val }) => {
        try {
            await httpRequest.post(
                `/video/${path}/${val}`,
                {},
                { withCredentials: true },
            );
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const isOldLike = favorite.likes.includes(videoInfo._id);
        if (isOldLike !== isLike) {
            handleEmotion({ path: 'like', val: videoInfo._id });
        }
    }, [debouncedLikeValue]);
    useEffect(() => {
        const isOldLove = favorite.loves.includes(videoInfo._id);
        if (isOldLove !== isLike) {
            handleEmotion({ path: 'love', val: videoInfo._id });
        }
    }, [debouncedLoveValue]);

    return (
        <div className={cx('action-bar')}>
            {/* Custom action bar item, default 48px 400px */}
            <InfoDialog
                info={videoInfo.belong_to}
                showFollowBtn={videoInfo.belong_to._id !== curUser._id}
                isFollow={isFollow}
            >
                <div className={cx('user-item')}>
                    <Image
                        className={cx('avt')}
                        src={videoInfo.belong_to.avatar}
                        alt=""
                    />
                    {videoInfo.belong_to._id === curUser._id ? null : (
                        <span className={cx('check')} onClick={handleFollow}>
                            <FontAwesomeIcon
                                className={cx('check-icon')}
                                icon={isFollow ? faCheck : faPlus}
                            />
                        </span>
                    )}
                </div>
            </InfoDialog>
            <div
                className={cx('action-item', { active: isLike })}
                onClick={(e) => handleSetLike(e)}
            >
                <span className={cx('icon-wrap', 'like-icon')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faHeart} />
                </span>
                <span className={cx('item-nums')}>{videoInfo.like}</span>
            </div>
            <div className={cx('action-item')}>
                <span className={cx('icon-wrap')}>
                    <FontAwesomeIcon
                        className={cx('icon')}
                        icon={faCommentDots}
                    />
                </span>
                <span className={cx('item-nums')}>{videoInfo.comment}</span>
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
                <span className={cx('item-nums')}>{videoInfo.love}</span>
            </div>
            <div className={cx('action-item')}>
                <span className={cx('icon-wrap')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faShare} />
                </span>
                <span className={cx('item-nums')}>{videoInfo.share}</span>
            </div>
        </div>
    );
}

export default memo(VideoActionBar);
