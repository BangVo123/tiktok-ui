import classNames from 'classnames/bind';
import styles from './CommentItem.module.scss';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { memo, useState } from 'react';

const cx = classNames.bind(styles);
function CommentItem({ avatar, username, comment, numsLike }) {
    const [like, setLike] = useState(false);
    const [likes, setLikes] = useState(numsLike);

    const handleSetLike = () => {
        if (like) {
            setLikes((prev) => prev - 1);
        } else {
            setLikes((prev) => prev + 1);
        }
        setLike((prev) => !prev);
    };

    return (
        <div className={cx('wrapper')}>
            <Image
                className={cx('user-avatar')}
                src={avatar}
                alt="user-avatar"
            />
            <div className={cx('content')}>
                <span className={cx('user-name')}>{username}</span>
                <p className={cx('comment')}>{comment}</p>
                <div className={cx('more')}>
                    <span className={cx('time')}>1d ago</span>
                    <span
                        className={cx('like-group', { active: like })}
                        onClick={handleSetLike}
                    >
                        {likes}
                        <FontAwesomeIcon
                            className={cx('heart-icon')}
                            icon={like ? solidHeart : regularHeart}
                        />
                    </span>

                    <button className={cx('delete-btn')}>Delete</button>
                    {/* <button className={cx('reply-btn')}>Reply</button> */}
                </div>
                {/* <button className={cx('see-more-btn')}>
                    See more replies
                    <FontAwesomeIcon
                        className={cx('down-icon')}
                        icon={faAngleDown}
                    />
                </button>
                <div className={cx('more-replies')}></div> */}
            </div>
        </div>
    );
}

export default memo(CommentItem);
