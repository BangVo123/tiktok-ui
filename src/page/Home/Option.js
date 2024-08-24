import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis,
    faVolumeHigh,
    faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import styles from './Home.module.scss';
import { VideoContext } from './Video';
import Button from '~/components/Button';
import { AutoScrollIcon, HeartBrokenIcon, FlagIcon } from '~/components/Icons';
import Toggle from '~/components/Toggle';

const cx = classNames.bind(styles);

function Option({ visible }) {
    const [isMuted, setIsMuted] = useState(false);
    const [isAutoScroll, setIsAutoScroll] = useState(false);
    const { videoRef } = useContext(VideoContext);

    const handleVolume = () => {
        if (videoRef.current) {
            if (isMuted) {
                setIsMuted(false);
                videoRef.current.muted = false;
            } else {
                setIsMuted(true);
                videoRef.current.muted = true;
            }
        }
    };

    const handleToggle = () => {
        setIsAutoScroll(!isAutoScroll);
    };
    return (
        <div className={cx('option', { visible })}>
            <span className={cx('volume')} onClick={handleVolume}>
                {isMuted ? (
                    <FontAwesomeIcon
                        className={cx('option-icon')}
                        icon={faVolumeXmark}
                    />
                ) : (
                    <FontAwesomeIcon
                        className={cx('option-icon')}
                        icon={faVolumeHigh}
                    />
                )}
            </span>
            <div className={cx('option-select')}>
                <HeadlessTippy
                    interactive
                    placement="bottom"
                    delay={[0, 400]}
                    offset={[140, -50]}
                    render={() => (
                        <div className={cx('tippy-wrapper')}>
                            <div className={cx('btn-wrapper')}>
                                <Button
                                    text
                                    leftIcon={<AutoScrollIcon />}
                                    className={cx('btn')}
                                >
                                    Auto scroll
                                </Button>
                                <Toggle
                                    isActive={isAutoScroll}
                                    onClick={handleToggle}
                                    className={cx('toggle')}
                                />
                                {/* <div
                                    className={cx('toggle-btn', { active: isAutoScroll })}
                                    onClick={handleToggle}
                                >
                                    <span className={cx('circle', { active: isAutoScroll })}></span>
                                </div> */}
                            </div>
                            <div className={cx('btn-wrapper')}>
                                <Button
                                    text
                                    leftIcon={<HeartBrokenIcon />}
                                    className={cx('btn')}
                                >
                                    Not interested
                                </Button>
                            </div>
                            <div className={cx('btn-wrapper')}>
                                <Button
                                    text
                                    leftIcon={<FlagIcon />}
                                    className={cx('btn')}
                                >
                                    Report
                                </Button>
                            </div>
                        </div>
                    )}
                >
                    <FontAwesomeIcon
                        className={cx('option-icon')}
                        icon={faEllipsis}
                    />
                </HeadlessTippy>
            </div>
        </div>
    );
}

export default Option;
