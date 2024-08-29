import { useReducer, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import HeadLessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faExclamation,
    faRotate,
} from '@fortawesome/free-solid-svg-icons';

import reducer, {
    initState,
    ON_REPLACE,
    SET_NAME,
    SET_SIZE,
    SET_DURATION,
    ON_SUCCESS,
    ON_CHANGE,
    SET_DESC,
    CHANGE_SEE_OPTION,
    CHANGE_TIME_UPLOAD,
    TOGGLE_COPYRIGHT,
    SET_SEE_FULL,
    SET_PERMISSION,
    TOGGLE_POST_CONTENT,
    TOGGLE_GENERATE_CONTENT,
} from '../reducer';
import styles from './EditFile.module.scss';
import Button from '~/components/Button';
import CheckBox from '~/components/Input/CheckBox';
import { Radio } from '~/components/Input';
import Toggle from '~/components/Toggle';
import Preview from '../Preview';
import VideoUpload from '../VideoUpload';
import * as httpRequest from '~/utils/httpRequest';
import convert from '~/utils/sizeConvert';
import { getDuration, convertDuration } from '~/utils/getDuration';

const cx = classNames.bind(styles);

function EditFile(props) {
    const [uploadInfo, setUploadInfo] = useState();
    const videoRef = useRef();
    const [state, dispatch] = useReducer(reducer, initState);

    const handleClick = (e) => {
        const text = e.target.innerText;
        if (text.startsWith('Followers')) {
            dispatch({ type: CHANGE_SEE_OPTION, value: 'Followers' });
        } else if (text.startsWith('Friends')) {
            dispatch({ type: CHANGE_SEE_OPTION, value: 'Friends' });
        } else if (text.startsWith('Only')) {
            dispatch({ type: CHANGE_SEE_OPTION, value: 'Only you' });
        }
    };

    const onChange = (e) => {
        dispatch({ type: ON_CHANGE, value: e.target.value });
    };

    const handleSetTime = (e) => {
        dispatch({ type: CHANGE_TIME_UPLOAD, value: e.target.value });
    };

    const handleToggleCopyright = () => {
        dispatch({ type: TOGGLE_COPYRIGHT, value: !state.copyrightCheck });
    };

    const handleSeeFull = () => {
        dispatch({ type: SET_SEE_FULL, value: !state.seeFull });
    };

    const handleSetPermission = (e) => {
        dispatch({ type: SET_PERMISSION, value: e.target.value });
    };

    const handleTogglePostContent = () => {
        dispatch({ type: TOGGLE_POST_CONTENT, value: !state.postContent });
    };

    const handleToggleGenerateContent = () => {
        dispatch({
            type: TOGGLE_GENERATE_CONTENT,
            value: !state.generateContent,
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: SET_NAME, value: props.file.name });
                dispatch({ type: SET_SIZE, value: convert(props.file.size) });
                const duration = await getDuration(props.file);
                dispatch({
                    type: SET_DURATION,
                    value: convertDuration(duration),
                });
                dispatch({
                    type: SET_DESC,
                    value: props.file.name.split('.')[0],
                });
                videoRef.current.src = URL.createObjectURL(
                    new Blob([props.file], { type: 'video/mp4' }),
                );

                const data = new FormData();
                data.append('file', props.file);
                const result = await httpRequest.post('/upload', data, {
                    withCredentials: true,
                });
                dispatch({ type: ON_SUCCESS });

                setUploadInfo(result.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    //use useEffect to set initial value for text area

    const handleSubmit = async () => {
        try {
            const data = { ...uploadInfo };
            data['content'] = state.desc;
            const result = await httpRequest.post('/video', data, {
                withCredentials: true,
            });
            console.log(result);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className={cx('container')}>
                {state.isReplace ? (
                    //handle onclick and set file again
                    <VideoUpload full={false} />
                ) : (
                    <>
                        <header className={cx('header')}>
                            <h3 className={cx('name')}>{state.name}</h3>
                            <Button
                                primary
                                leftIcon={<FontAwesomeIcon icon={faRotate} />}
                                onClick={() => dispatch({ type: ON_REPLACE })}
                            >
                                Replace
                            </Button>
                        </header>
                        <div>
                            <span className={cx('desc')}>Size:</span>
                            <span className={cx('value')}>{state.size}</span>
                            <span className={cx('desc')}>Duration:</span>
                            <span className={cx('value')}>
                                {state.duration}
                            </span>
                        </div>
                        <div className={cx('progress')}>
                            <span
                                className={cx('state', {
                                    success: state.progress,
                                })}
                            >
                                {state.progress ? 'Uploaded' : 'Uploading...'}
                            </span>
                        </div>
                    </>
                )}
            </div>

            <div className={cx('container')}>
                <div className={cx('flex-content')}>
                    <div className={cx('edit')}>
                        <div className={cx('edit-item')}>
                            <span className={cx('edit-header')}>
                                Description
                            </span>
                            <div className={cx('desc-container')}>
                                <textarea
                                    className={cx('input')}
                                    spellCheck={false}
                                    value={state.desc}
                                    placeholder="Share more about video here..."
                                    onChange={(e) => onChange(e)}
                                />
                                <div className={cx('caption')}>
                                    <Button className={cx('btn')}>
                                        @ Hashtags
                                    </Button>
                                    <Button className={cx('btn')}>
                                        # Mention
                                    </Button>
                                    <span className={cx('nums-input')}>
                                        {state.numsDesc}/4000
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('edit-item')}>
                            <span className={cx('edit-header')}>
                                Cover
                                <span>
                                    <Tippy
                                        interactive
                                        content="
                                                Select a cover or upload one from your device. An engaging cover can effectively capture viewers’ interest."
                                        placement="top"
                                        delay={[0, 500]}
                                    >
                                        <span className={cx('icon-wrapper')}>
                                            <FontAwesomeIcon
                                                icon={faExclamation}
                                                className={cx('warning-icon')}
                                            />
                                        </span>
                                    </Tippy>
                                </span>
                            </span>
                            <div className={cx('edt-cover')}>
                                {/* image, icon, both full width */}
                            </div>
                        </div>
                        <div className={cx('edit-item')}>
                            <span className={cx('edit-header')}>
                                Who can watch this video
                            </span>
                            <HeadLessTippy
                                trigger="click"
                                placement="bottom-start"
                                interactive
                                render={() => (
                                    <div className={cx('tippy-wrapper')}>
                                        <Button
                                            className={cx('option', {
                                                active:
                                                    state.see === 'Followers',
                                            })}
                                            onClick={(e) => handleClick(e)}
                                        >
                                            Followers
                                        </Button>
                                        <Button
                                            className={cx('option', {
                                                active: state.see === 'Friends',
                                            })}
                                            onClick={(e) => handleClick(e)}
                                        >
                                            Friends
                                            <span className={cx('option-desc')}>
                                                Followers you follow back
                                            </span>
                                        </Button>
                                        <Button
                                            className={cx('option', {
                                                active:
                                                    state.see === 'Only you',
                                            })}
                                            onClick={(e) => handleClick(e)}
                                        >
                                            Only you
                                        </Button>
                                    </div>
                                )}
                            >
                                <div className={cx('scope')}>
                                    {state.see}
                                    <FontAwesomeIcon
                                        icon={faAngleDown}
                                        className={cx('icon')}
                                    />
                                </div>
                            </HeadLessTippy>
                        </div>
                        <div className={cx('edit-item')}>
                            <span className={cx('edit-header')}>
                                When to post
                            </span>
                            <div className={cx('edit-wrapper')}>
                                <Radio
                                    className={cx('select')}
                                    label={'Now'}
                                    name={'timing'}
                                    current={state.time}
                                    onClick={(e) => handleSetTime(e)}
                                />
                                <Radio
                                    className={cx('select')}
                                    label={'Schedule'}
                                    name={'timing'}
                                    current={state.time}
                                    onClick={(e) => handleSetTime(e)}
                                />
                                <div>
                                    <Tippy
                                        content="By scheduling your video, you allow your video to be uploaded and stored on our servers before posting."
                                        placement="top"
                                        delay={[0, 500]}
                                        interactive
                                    >
                                        <span className={cx('icon-wrapper')}>
                                            <FontAwesomeIcon
                                                icon={faExclamation}
                                                className={cx('warning-icon')}
                                            />
                                        </span>
                                    </Tippy>
                                </div>
                            </div>
                        </div>
                        <div className={cx('edit-item')}>
                            <span className={cx('edit-header')}>
                                Run a copyright check
                                <span>
                                    <Tippy
                                        interactive
                                        allowHTML={true}
                                        content={
                                            <div>
                                                We’ll check your video for
                                                potential copyright
                                                infringements on used sounds. If
                                                infringements are found, you can
                                                edit the video before posting.
                                                <button
                                                    className={cx('more-btn')}
                                                >
                                                    Learn more
                                                </button>
                                            </div>
                                        }
                                        placement="top"
                                        delay={[0, 1000]}
                                    >
                                        <span className={cx('icon-wrapper')}>
                                            <FontAwesomeIcon
                                                icon={faExclamation}
                                                className={cx('warning-icon')}
                                            />
                                        </span>
                                    </Tippy>
                                </span>
                                <Toggle
                                    isActive={state.copyrightCheck}
                                    className={cx('toggle')}
                                    onClick={handleToggleCopyright}
                                />
                            </span>
                        </div>
                        <div className={cx('edit-item')}>
                            <span
                                className={cx('edit-header', 'see-more-btn')}
                                onClick={handleSeeFull}
                            >
                                {state.seeFull ? 'See more' : 'See less'}
                                <span className={cx('more-icon')}>
                                    <FontAwesomeIcon icon={faAngleDown} />
                                </span>
                            </span>
                            <span className={cx('desc')}>
                                Content disclosure and other advanced settings
                            </span>
                        </div>
                        {state.seeFull ? (
                            <>
                                <div className={cx('edit-item')}>
                                    <span className={cx('edit-header')}>
                                        Allow users to:
                                    </span>
                                    <div className={cx('edit-wrapper')}>
                                        <CheckBox
                                            className={cx('select')}
                                            label={'Comment'}
                                            checked={state.userAllow.includes(
                                                'Comment',
                                            )}
                                            onClick={(e) =>
                                                handleSetPermission(e)
                                            }
                                        />
                                        <CheckBox
                                            className={cx('select')}
                                            label={'Duet'}
                                            checked={state.userAllow.includes(
                                                'Duet',
                                            )}
                                            onClick={(e) =>
                                                handleSetPermission(e)
                                            }
                                        />
                                        <CheckBox
                                            className={cx('select')}
                                            label={'Stitch'}
                                            checked={state.userAllow.includes(
                                                'Stitch',
                                            )}
                                            onClick={(e) =>
                                                handleSetPermission(e)
                                            }
                                        />
                                    </div>
                                    <span className={cx('info')}>
                                        Duet and Stitch aren’t available on
                                        videos from private accounts
                                    </span>
                                </div>
                                <div className={cx('edit-item')}>
                                    <span className={cx('edit-header')}>
                                        Disclose post content
                                        <Toggle
                                            className={cx('toggle')}
                                            isActive={state.postContent}
                                            onClick={handleTogglePostContent}
                                        />
                                    </span>
                                    <span className={cx('desc')}>
                                        Let others know this post promotes a
                                        brand, product or service.
                                    </span>
                                </div>
                                <div className={cx('edit-item')}>
                                    <span className={cx('edit-header')}>
                                        AI-generated content
                                        <Toggle
                                            className={cx('toggle')}
                                            isActive={state.generateContent}
                                            onClick={
                                                handleToggleGenerateContent
                                            }
                                        />
                                    </span>
                                    <span className={cx('desc')}>
                                        Add this label for aigc.
                                        <a
                                            href="https://www.tiktok.com/tns-inapp/pages/ai-generated-content?hide_nav_bar=1&enter_from=web_upload&lang=en"
                                            className={cx('link')}
                                        >
                                            Learn more
                                        </a>
                                    </span>
                                </div>
                            </>
                        ) : null}
                        <div>
                            <span className={cx('divider')}></span>
                        </div>
                        <div className={cx('footer')}>
                            <Button
                                className={cx('footer-btn')}
                                primary
                                onClick={handleSubmit}
                            >
                                Post
                            </Button>
                            <Button className={cx('footer-btn')} normal>
                                Save draft
                            </Button>
                            <Button className={cx('footer-btn')} normal>
                                Discard
                            </Button>
                        </div>
                    </div>
                    <div className={cx('preview')}>
                        <Preview ref={videoRef} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditFile;
