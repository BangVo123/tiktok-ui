import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);
function VideoTitle({ name, title }) {
    const [isOverFlow, setIsOverFlow] = useState(false);
    const [isFullTitle, setIsFullTitle] = useState(false);
    const titleRef = useRef();
    const handleToggleFullTitle = () => {
        setIsFullTitle(!isFullTitle);
    };

    useEffect(() => {
        if (titleRef.current.scrollWidth > titleRef.current.clientWidth) {
            setIsOverFlow(true);
        }
    }, []);

    return (
        <div className={cx('video-title')}>
            <a href="ahs" className={cx('username')}>
                {/* {videoInfoRef.current.belong_to.full_name} */}
                {name}
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
                    {/* {videoInfoRef.current.content} */}
                    {title}
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
    );
}

export default VideoTitle;
