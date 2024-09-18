import classNames from 'classnames/bind';
import { useContext, useState, useRef, useCallback } from 'react';
import { UserContext } from '~/Provider/UserProvider';
import styles from './Home.module.scss';
import Video from './Video';
import * as httpRequest from '~/utils/httpRequest';

const cx = classNames.bind(styles);

function Home() {
    const { videos, setVideos, paginate, setPaginate } =
        useContext(UserContext);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const observer = useRef(null);

    const loadMore = useCallback(async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        try {
            const res = await httpRequest.get(
                `/video`,
                { page: paginate.page, limit: paginate.limit },
                { withCredentials: true },
            );

            if (res.data.length === 0) setHasMore(false);
            else {
                if (res.data.length < 5) {
                    setHasMore(false);
                }
                setVideos((prev) => {
                    return [...prev, ...res.data];
                });
                setPaginate((prev) => ({ ...prev, page: prev.page + 1 }));
            }
        } catch (err) {
            console.log('Error', err);
        } finally {
            setIsLoading(false);
        }
    }, [paginate, isLoading, hasMore]);

    const callback = useCallback(
        (node) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) loadMore();
            });
            if (node) observer.current.observe(node);
        },
        [isLoading.hasMore, loadMore],
    );

    return (
        <div className={cx('wrapper')}>
            {videos &&
                videos.map((el, idx, videos) => (
                    <div
                        key={el.id || idx}
                        ref={idx === videos.length - 2 ? callback : null}
                    >
                        <Video video={el} />
                    </div>
                ))}
        </div>
    );
}

export default Home;
