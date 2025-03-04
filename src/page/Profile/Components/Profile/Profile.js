import classNames from 'classnames/bind';
import Image from '~/components/Image';
import { useUser } from '~/Provider/UserProvider';
import styles from './Profile.module.scss';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import EditModal from '../EditModal';
import AccountInfoModal from '../AccountInfoModal';
import * as httpRequest from '../../../../utils/httpRequest';

const cx = classNames.bind(styles);

function Profile() {
    const { curUser } = useUser();
    const [mouseEnter, setMouseEnter] = useState(0);
    const [active, setActive] = useState(0);
    const [isShowEditModal, setIsShowEditModal] = useState(false);
    const [isShowAccountInfoModal, setIsShowAccountInfoModal] = useState(false);
    const [currentIdxOfInfoModal, setCurrentIdxOfInfoModal] = useState(0);

    const handleSetActive = (idx) => {
        setActive(idx);
    };
    const handleSetMouseEnter = (idx) => {
        setMouseEnter(idx);
    };
    const handleSetMouseLeave = (e) => {
        setMouseEnter(active);
    };
    const handleOpenInfoModal = (idx) => {
        setIsShowAccountInfoModal(true);
        setCurrentIdxOfInfoModal(idx);
    };
    const handleOpenEditModal = () => {
        setIsShowEditModal(true);
    };
    const handleCloseEditModal = () => {
        setIsShowEditModal(false);
    };
    const handleCloseInfoModal = () => {
        setIsShowAccountInfoModal(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await httpRequest.get(
                '/video/me',
                {},
                { withCredentials: true },
            );
            console.log(res);
        };

        fetchData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('main-info')}>
                <Image
                    className={cx('user-avatar')}
                    alt=""
                    src={curUser.avatar}
                />
                <div className={cx('user-info')}>
                    <h5 className={cx('username')}>{curUser.full_name}</h5>
                    <Button
                        primary
                        className={cx('edit-btn')}
                        onClick={handleOpenEditModal}
                    >
                        Edit profile
                    </Button>
                    <div className={cx('account-info')}>
                        <div className={cx('info-item')}>
                            <span className={cx('numbers')}>
                                {curUser.followings_count}
                            </span>
                            <span
                                className={cx('info-name', 'enable')}
                                onClick={() => handleOpenInfoModal(0)}
                            >
                                Following
                            </span>
                        </div>
                        <div className={cx('info-item')}>
                            <span className={cx('numbers')}>
                                {curUser.followers_count}
                            </span>
                            <span
                                className={cx('info-name', 'enable')}
                                onClick={() => handleOpenInfoModal(1)}
                            >
                                Followers
                            </span>
                        </div>
                        <div className={cx('info-item')}>
                            <span className={cx('numbers')}>
                                {curUser.likes_count}
                            </span>
                            <span className={cx('info-name')}>Likes</span>
                        </div>
                    </div>
                    <p className={cx('bio')}>{curUser.bio}</p>
                </div>
            </div>
            <div className={cx('videos')}>
                <div className={cx('option-header')}>
                    <div className={cx('videos-type')}>
                        <span
                            className={cx('title-type', {
                                active: active === 0,
                            })}
                            onClick={() => handleSetActive(0)}
                            onMouseEnter={() => handleSetMouseEnter(0)}
                            onMouseLeave={handleSetMouseLeave}
                        >
                            Videos
                        </span>
                        <span
                            className={cx('title-type', {
                                active: active === 1,
                            })}
                            onClick={() => handleSetActive(1)}
                            onMouseEnter={() => handleSetMouseEnter(1)}
                            onMouseLeave={handleSetMouseLeave}
                        >
                            Favorites
                        </span>
                        <span
                            className={cx('title-type', {
                                active: active === 2,
                            })}
                            onClick={() => handleSetActive(2)}
                            onMouseEnter={() => handleSetMouseEnter(2)}
                            onMouseLeave={handleSetMouseLeave}
                        >
                            Liked
                        </span>
                    </div>
                </div>
                <div className={cx('split')}>
                    <span
                        className={cx('pointer')}
                        style={{
                            transform: `translateX(calc(${mouseEnter} * 10rem))`,
                            transition: `transform 0.3s ease`,
                        }}
                    ></span>
                    <div className={cx('split-line')}></div>
                </div>
                <div className={cx('video-content')}></div>
            </div>
            {isShowEditModal && (
                <EditModal onCloseEditModal={handleCloseEditModal} />
            )}
            {isShowAccountInfoModal && (
                <AccountInfoModal onCloseInfoModal={handleCloseInfoModal} />
            )}
        </div>
    );
}

export default Profile;
