import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './FollowingAccounts.module.scss';
import AccountItem from './AccountItem';
import { useEffect, useState } from 'react';
import { useUser } from '~/Provider/UserProvider';

const cx = classNames.bind(styles);

function FollowingAccounts({ label }) {
    const { accountRelations } = useUser();
    const [numItems, setNumItems] = useState();

    const handleSetNumItems = () => {
        setNumItems((prev) => {
            if (prev + 5 < accountRelations.current.following.length) {
                return prev + 5;
            }
            return accountRelations.current.following.length;
        });
    };

    useEffect(() => {
        if (accountRelations.current?.following.length < 3)
            setNumItems(accountRelations.current.following.length);
        else setNumItems(3);
    }, []);

    console.log('following: ', accountRelations.current.following);

    return (
        <>
            {accountRelations.current?.following &&
                accountRelations.current?.following.length !== 0 && (
                    <div className={cx('wrapper')}>
                        <p className={cx('label')}>{label}</p>
                        {/* <AccountItem />
                    <AccountItem />
                    <AccountItem /> */}

                        {accountRelations.current.following.map((el, idx) => {
                            if (idx < numItems)
                                return (
                                    <AccountItem
                                        key={el._id}
                                        avt={el.following_id?.avatar}
                                        fullname={el.following_id?.full_name}
                                        tick={el.following_id?.tick}
                                    />
                                );
                        })}

                        {numItems <
                            accountRelations.current.following.length && (
                            <p
                                className={cx('more-btn')}
                                onClick={handleSetNumItems}
                            >
                                See more
                            </p>
                        )}
                    </div>
                )}
        </>
    );
}

FollowingAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default FollowingAccounts;
