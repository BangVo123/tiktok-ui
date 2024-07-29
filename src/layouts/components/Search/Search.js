import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faSpinner,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { useDebounce } from '~/hooks';
import styles from './Search.module.scss';

import * as searchService from '~/services/searchService';
import { Wrapper as PoperWrapper } from '~/components/Poper';
import AccountItem from '~/components/AccountItem/AccountItem';

const cx = classNames.bind(styles);

function Search() {
    const [searchTxt, setTextTxt] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const searchInput = useRef();

    const debouncedValue = useDebounce(searchTxt, 500);

    useEffect(() => {
        if (!searchTxt.trim()) {
            setSearchResult([]);
            return;
        }

        //only call api from service
        const fetchApi = async () => {
            setLoading(true);

            const result = await searchService.search(debouncedValue);
            setSearchResult(result);

            setLoading(false);
        };
        fetchApi();
        // eslint-disable-next-line
    }, [debouncedValue]);

    function handleHideResult() {
        setShowResult(false);
    }

    function handleChange(e) {
        const searchVal = e.target.value;
        if (!searchVal.startsWith(' ')) setTextTxt(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        //Using a wrapper <div> or <span> tag around the reference element solves
        //this by creating a new parent node context (tippyjs library   )
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    //tabindex: not allow using tab on keyboard to focus element
                    <div
                        className={cx('search-result')}
                        tabIndex="-1"
                        {...attrs}
                    >
                        <PoperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PoperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={searchInput}
                        placeholder="Search"
                        value={searchTxt}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />

                    {!!searchTxt && !loading && (
                        <button
                            className={cx('clear')}
                            onClick={() => {
                                setTextTxt('');
                                setSearchResult([]);
                                searchInput.current.focus();
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && (
                        <FontAwesomeIcon
                            className={cx('loading')}
                            icon={faSpinner}
                        />
                    )}

                    <button className={cx('search-btn')} onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
