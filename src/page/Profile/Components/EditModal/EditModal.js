import classNames from 'classnames/bind';
import styles from './EditModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faX } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import Image from '~/components/Image';
import { useEffect, useRef, useState } from 'react';
import { useUser } from '~/Provider/UserProvider';
import httpRequest from '~/utils/httpRequest';

const cx = classNames.bind(styles);

function EditModal({ onCloseEditModal }) {
    const { curUser, setCurUser } = useUser();
    const [avatar, setAvatar] = useState(null);
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [numberCharactersOfBio, setNumberCharactersOfBio] = useState(0);
    const [disableSaveBtn, setDisableSaveBtn] = useState(true);
    const inputAvatarRef = useRef();
    const oldUserVal = useRef();

    const handleSelectAvatar = () => {
        inputAvatarRef.current.click();
    };
    const handleSetAvatar = async (e) => {
        const data = new FormData();
        data.append('avatar', e.target.files[0]);

        const res = await Promise.resolve(
            httpRequest.post('/upload/avatar', data, { withCredentials: true }),
        );

        // console.log(res.data.data);
        setAvatar(res.data.data);
        setDisableSaveBtn(false);
    };
    const handleSetUsername = (e) => {
        setUsername(e.target.value);

        if (disableSaveBtn) {
            if (e.target.value !== oldUserVal.current.username) {
                setDisableSaveBtn(false);
            }
        } else {
            if (
                e.target.value === oldUserVal.current.username &&
                avatar === null &&
                bio === oldUserVal.current.bio
            ) {
                setDisableSaveBtn(true);
            }
        }
    };
    const handleSetBio = (e) => {
        const bio = e.target.value;

        setBio(bio);
        setNumberCharactersOfBio(bio.length);

        if (bio.length > 80) {
            setDisableSaveBtn(true);
            return;
        }

        if (disableSaveBtn) {
            if (bio !== oldUserVal.current.bio) {
                setDisableSaveBtn(false);
            }
        } else {
            if (
                bio === oldUserVal.current.bio &&
                avatar === null &&
                username === oldUserVal.current.username
            ) {
                setDisableSaveBtn(true);
            }
        }
    };

    const handleUpdateMe = async () => {
        const payload = {};

        if (username) payload['full_name'] = username;
        if (bio) payload['bio'] = bio;
        if (avatar) payload['avatar'] = avatar;

        const res = await httpRequest.patch('/users', payload, {
            withCredentials: true,
        });

        setCurUser(res.data.data);

        onCloseEditModal();
    };

    useEffect(() => {
        if (curUser) {
            setUsername(curUser.full_name);
            if (!curUser?.bio?.includes('No bio yet') && curUser.bio !== '') {
                setBio(curUser.bio);
                setNumberCharactersOfBio(curUser.bio?.length);
            }
        }
    }, [curUser]);

    useEffect(() => {
        if (curUser) {
            oldUserVal.current = {
                username: curUser.full_name,
                bio: curUser.bio.includes('No bio yet') ? '' : curUser.bio,
            };
        }

        console.log(oldUserVal.current);
    }, []);

    console.log(avatar);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('overlay')}></div>
            <div className={cx('content-wrapper')}>
                <div className={cx('content')}>
                    <div className={cx('header')}>
                        <h4 className={cx('title')}>Edit profile</h4>
                        <span
                            className={cx('close-btn')}
                            onClick={onCloseEditModal}
                        >
                            <FontAwesomeIcon
                                className={cx('close-icon')}
                                icon={faX}
                            />
                        </span>
                    </div>
                    <div className={cx('body')}>
                        <div className={cx('main-content')}>
                            <div className={cx('content-title')}>
                                Profile photo
                            </div>
                            <div
                                className={cx('main-item-content')}
                                onClick={handleSelectAvatar}
                            >
                                <Image
                                    src={avatar || curUser.avatar}
                                    alt=""
                                    className={cx('img')}
                                />
                                <span className={cx('edit')}>
                                    <FontAwesomeIcon
                                        className={cx('edit-icon')}
                                        icon={faPen}
                                    />
                                </span>
                                <input
                                    className={cx('file-input')}
                                    type="file"
                                    accept="image/*"
                                    ref={inputAvatarRef}
                                    onChange={(e) => handleSetAvatar(e)}
                                />
                            </div>
                        </div>
                        <div className={cx('main-content')}>
                            <div className={cx('content-title')}>Username</div>
                            <div className={cx('main-item-content')}>
                                <span className={cx('input-box')}>
                                    <input
                                        className={cx('input-name')}
                                        type="text"
                                        value={username}
                                        onChange={(e) => handleSetUsername(e)}
                                    />
                                </span>
                            </div>
                        </div>
                        <div className={cx('main-content')}>
                            <div className={cx('content-title')}>Bio</div>
                            <div className={cx('main-item-content')}>
                                <span className={cx('textarea-box')}>
                                    <textarea
                                        className={cx('textarea')}
                                        value={bio}
                                        onChange={(e) => handleSetBio(e)}
                                    />
                                </span>
                                <span className={cx('number-characters')}>
                                    {numberCharactersOfBio}/80
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('footer')}>
                        <div>
                            <Button
                                normal
                                className={cx('cancel-btn')}
                                onClick={onCloseEditModal}
                            >
                                Cancel
                            </Button>
                            <Button
                                primary
                                className={cx('save-btn')}
                                disabled={disableSaveBtn}
                                onClick={handleUpdateMe}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditModal;
