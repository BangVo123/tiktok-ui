import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { Wrapper as PoperWrapper } from '~/components/Poper';
import MenuItem from './MenuItem';
import Header from './Header';
import styles from './Menu.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Menu({
    children,
    items = [],
    hideOnClick = false,
    onChange = defaultFn,
}) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const renderItem = () => {
        return current.data.map((item, idx) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={idx}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const renderResult = (attrs) => (
        //tabindex: not allow using tab on keyboard to focus element
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PoperWrapper className={cx('menu-poper')}>
                {history.length > 1 && (
                    <Header title={current.title} onBack={handleBack} />
                )}
                <div className={cx('body')}>{renderItem()}</div>
            </PoperWrapper>
        </div>
    );

    //reset to first page
    const handleResetMenu = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    return (
        <Tippy
            interactive
            hideOnClick={hideOnClick}
            delay={[0, 700]}
            render={renderResult}
            onHide={handleResetMenu}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
