import classNames from 'classnames/bind';
import styles from './AccountInfoModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import { useUser } from '~/Provider/UserProvider';
import { useState } from 'react';

const cx = classNames.bind(styles);

function AccountInfoModal({ onCloseInfoModal, initIdx }) {
    const { curUser, accountRelations } = useUser();
    const [active, setActive] = useState(initIdx);
    const [currentMouseIdx, setCurrentMouseIdx] = useState(0);
    const [currentItems, setCurrentItems] = useState(
        initIdx === 0
            ? accountRelations.current.following
            : accountRelations.current.followers,
    );

    const handleSetActive = (idx) => {
        setActive(idx);
        switch (idx) {
            case 0:
                setCurrentItems(accountRelations.current.following);
                break;
            case 1:
                setCurrentItems(accountRelations.current.followers);
                break;
            case 2:
                setCurrentItems(accountRelations.current.friends);
                break;
            default:
                break;
        }
    };
    const handleSetPointer = (idx) => {
        setCurrentMouseIdx(idx);
    };
    const handleResetPointer = () => {
        setCurrentMouseIdx(active);
    };

    console.log(currentItems);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('overlay')}></div>
            <div className={cx('content-wrapper')}>
                <div className={cx('content')}>
                    <div className={cx('header')}>
                        <h4 className={cx('username')}>{curUser.full_name}</h4>
                        <span
                            className={cx('close-btn')}
                            onClick={onCloseInfoModal}
                        >
                            <FontAwesomeIcon
                                className={cx('close-icon')}
                                icon={faX}
                            />
                        </span>
                    </div>
                    <div className={cx('body')}>
                        <div className={cx('title')}>
                            <span
                                className={cx('title-item', {
                                    active: active === 0,
                                })}
                                onClick={() => handleSetActive(0)}
                                onMouseEnter={() => handleSetPointer(0)}
                                onMouseLeave={handleResetPointer}
                            >
                                Following
                            </span>
                            <span
                                className={cx('title-item', {
                                    active: active === 1,
                                })}
                                onClick={() => handleSetActive(1)}
                                onMouseEnter={() => handleSetPointer(1)}
                                onMouseLeave={handleResetPointer}
                            >
                                Followers
                            </span>
                            <span
                                className={cx('title-item', {
                                    active: active === 2,
                                })}
                                onClick={() => handleSetActive(2)}
                                onMouseEnter={() => handleSetPointer(2)}
                                onMouseLeave={handleResetPointer}
                            >
                                Friends
                            </span>
                            <span
                                className={cx('pointer')}
                                style={{
                                    transform: `translateX(calc(calc(40vw / 3) * ${currentMouseIdx}))`,
                                    transition: 'transform 0.2s linear',
                                }}
                            ></span>
                        </div>
                        <div className={cx('split')}></div>
                        <div className={cx('main-content')}>
                            {currentItems.length > 0
                                ? currentItems.map((el) => (
                                      <div
                                          className={cx('item')}
                                          key={el.following_id.id}
                                      >
                                          <AccountItem
                                              data={el.following_id}
                                              className={cx('account-item')}
                                          />
                                          <Button primary className={cx('btn')}>
                                              Follow
                                          </Button>
                                      </div>
                                  ))
                                : null}
                            {/* <div className={cx('item')}>
                                <AccountItem
                                    data={curUser}
                                    className={cx('account-item')}
                                />
                                <Button primary className={cx('btn')}>
                                    Follow
                                </Button>
                            </div>
                            <div className={cx('item')}>
                                <AccountItem
                                    data={curUser}
                                    className={cx('account-item')}
                                />
                                <Button primary className={cx('btn')}>
                                    Follow
                                </Button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountInfoModal;
