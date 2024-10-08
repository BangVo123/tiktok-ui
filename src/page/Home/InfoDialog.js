import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './Home.module.scss';
import Image from '~/components/Image';
import { memo, useRef, useState } from 'react';
import * as httpRequest from '~/utils/httpRequest';

const cx = classNames.bind(styles);

function InfoDialog({ children, info, showFollowBtn, isFollow }) {
    const [userInfo, setUserInfo] = useState();
    const compRef = useRef();

    const fetchAPI = async () => {
        const res = await httpRequest.get(
            `/users/${info._id}`,
            {},
            { withCredentials: true },
        );
        setUserInfo(res.data);
    };

    return (
        <div>
            <HeadlessTippy
                ref={compRef}
                interactive
                delay={[500, 500]}
                placement="bottom-start"
                offset={[0, 20]}
                onShow={() => fetchAPI()}
                render={() => (
                    <div className={cx('tippy-wrapper')}>
                        <header className={cx('header')}>
                            <Image
                                src={userInfo?.avatar}
                                alt=""
                                className={cx('tippy-avt')}
                            />
                            {showFollowBtn && (
                                <Button
                                    outline
                                    className={cx({ following: isFollow })}
                                >
                                    {isFollow ? 'Following' : 'Follow'}
                                </Button>
                            )}
                        </header>
                        <div className={cx('body')}>
                            <span className={cx('user-name')}>
                                {userInfo?.full_name}
                            </span>
                            <span className={cx('name')}>
                                {userInfo?.full_name}
                            </span>

                            <div className={cx('info')}>
                                <span className={cx('tippy-nums')}>
                                    {userInfo?.followers_count}
                                </span>
                                <span className={cx('info-header')}>
                                    Followers
                                </span>
                                <span className={cx('tippy-nums')}>
                                    {userInfo?.likes_count}
                                </span>
                                <span className={cx('info-header')}>Likes</span>
                            </div>
                        </div>
                        <footer className={cx('footer')}>
                            <div className={cx('bio')}>{userInfo?.bio}</div>
                        </footer>
                    </div>
                )}
            >
                {children}
            </HeadlessTippy>
        </div>
    );
}

export default memo(InfoDialog);
