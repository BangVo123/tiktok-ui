import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceLaugh, faX } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { useEffect, useState, useRef, memo } from 'react';

import { useUser } from '~/Provider/UserProvider';
import { useModal } from '~/Provider/ModalProvider';
import { useVideo } from '../Video';
import CommentItem from './CommentItem/CommentItem';
import * as httpRequest from '~/utils/httpRequest';

const cx = classNames.bind(styles);

function Comment({ handleToggleComment }) {
    const { isAuthenticate, curUser, socketInstance } = useUser();
    const { videoInfo } = useVideo();
    const { onOpenModal } = useModal();
    const commentPage = useRef({ page: 1, limit: 10 });
    const [comments, setComments] = useState([]);

    const [comment, setComment] = useState({
        sender: {
            avatar: curUser.avatar,
            full_name: curUser.full_name,
        },
        content: '',
        like: 0,
    });

    // socketInstance.current.on('newComment', (comment) => {
    //     setComments((prev) => [comment, ...prev]);
    // });

    const handleSetComment = (e) => {
        setComment((prev) => ({ ...prev, content: e.target.value }));
    };
    const handleComment = async () => {
        if (!isAuthenticate) {
            onOpenModal();
        } else {
            socketInstance.current.emit(
                'comment',
                comment,
                videoInfo._id,
                curUser._id,
            );
            // videoInfo.comment = videoInfo.comment + 1;
            // setComments((prev) => [comment, ...prev]);
            setComment((prev) => ({ ...prev, content: '' }));
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleComment();
        }
    };

    useEffect(() => {
        if (comments.length === 0) {
            const fetchData = async () => {
                const res = await httpRequest.get(
                    `/comments/${videoInfo._id}`,
                    {
                        page: commentPage.current.page,
                        limit: commentPage.current.limit,
                    },
                    { withCredentials: true },
                );

                setComments(res.data);
            };
            fetchData();
        }

        const handleNewComment = (comment) => {
            videoInfo.comment = videoInfo.comment + 1;
            setComments((prev) => [comment, ...prev]);
        };
        socketInstance.current.on('newComment', handleNewComment);
        return () => {
            socketInstance.current.off('newComment');
        };
    }, []);

    // useEffect(() => {
    //     const handleNewComment = (comment) => {
    //         videoInfo.comment = videoInfo.comment + 1;
    //         setComments((prev) => [comment, ...prev]);
    //     };
    //     socketInstance.current.on('newComment', handleNewComment);
    //     return () => {
    //         socketInstance.current.off('newComment');
    //     };
    // }, []);

    console.log(comments);

    return (
        <div className={cx('wrapper')}>
            <header className={cx('comment-header')}>
                <h4 className={cx('header-title')}>
                    Comments (<span>{videoInfo.comment}</span>)
                </h4>
                <span
                    className={cx('close-btn')}
                    onClick={() => handleToggleComment()}
                >
                    <FontAwesomeIcon icon={faX} />
                </span>
            </header>
            <div className={cx('comment-body')}>
                {comments &&
                    comments.map((el) => (
                        <CommentItem
                            key={`${Date.now()}_${Math.random().toString(36)}`}
                            avatar={el.sender.avatar}
                            username={el.sender.full_name}
                            comment={el.content}
                            numsLike={el.like}
                        />
                    ))}
            </div>
            <footer className={cx('comment-footer')}>
                <div className={cx('input-group')}>
                    <input
                        className={cx('comment-input')}
                        type="text"
                        placeholder="Add comment..."
                        autoFocus
                        value={comment.content}
                        onKeyDown={(e) => handleKeyDown(e)}
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
                    disabled={comment.content.trim() === ''}
                    className={cx('post-btn', {
                        active: !!comment.content.trim(),
                    })}
                    onClick={handleComment}
                >
                    Post
                </button>
            </footer>
        </div>
    );
}

export default memo(Comment);
