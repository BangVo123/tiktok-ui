import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceLaugh, faX } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { useState, useContext } from 'react';
import { useUser } from '~/Provider/UserProvider';
import { useModal } from '~/Provider/ModalProvider';
import * as httpRequest from '~/utils/httpRequest';
import { useVideo } from '../Video';

const cx = classNames.bind(styles);

function Comment({ handleToggleComment, numsComment }) {
    const { isAuthenticate, curUser } = useUser(useUser);
    const { videoInfo } = useVideo();
    const { onOpenModal } = useModal();
    const [comment, setComment] = useState('');
    const handleSetComment = (e) => {
        setComment(e.target.value);
    };
    const handleComment = async () => {
        if (!isAuthenticate) {
            onOpenModal();
        } else {
            const res = await httpRequest.post(
                '/comments',
                {
                    comment: comment,
                    belong_to: videoInfo._id,
                    sender: curUser._id,
                },
                { withCredentials: true },
            );

            if (res.status === 201) {
            } else {
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <header className={cx('comment-header')}>
                <h4 className={cx('header-title')}>
                    Comments (<span>{numsComment}</span>)
                </h4>
                <span
                    className={cx('close-btn')}
                    onClick={() => handleToggleComment()}
                >
                    <FontAwesomeIcon icon={faX} />
                </span>
            </header>
            <div className={cx('comment-body')}></div>
            <footer className={cx('comment-footer')}>
                <div className={cx('input-group')}>
                    <input
                        className={cx('comment-input')}
                        type="text"
                        placeholder="Add comment..."
                        onChange={(e) => handleSetComment(e)}
                    />
                    <Tippy
                        content="'@' a user to tag them in your comment"
                        placement="top"
                        delay={[0, 200]}
                    >
                        <button className={cx('tag-btn')}>@</button>
                    </Tippy>
                    <Tippy
                        content="Click to add emojis"
                        placement="top"
                        delay={[0, 200]}
                    >
                        <button className={cx('emoji-btn')}>
                            <FontAwesomeIcon
                                className={cx('emoji-icon')}
                                icon={faFaceLaugh}
                            />
                        </button>
                    </Tippy>
                </div>
                <button
                    disabled={comment.trim() === ''}
                    className={cx('post-btn', { active: !!comment.trim() })}
                    onClick={handleComment}
                >
                    Post
                </button>
            </footer>
        </div>
    );
}

export default Comment;
