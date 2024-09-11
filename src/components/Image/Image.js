import { useState, forwardRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Image.module.scss';
import images from '~/assets/images';

const Image = forwardRef(
    (
        {
            src,
            alt,
            className,
            fallBack: customFallBack = images.noImage,
            ...props
        },
        ref,
    ) => {
        const [_fallBack, setFallback] = useState('');

        const handleError = () => {
            setFallback(customFallBack);
        };

        return (
            <img
                className={classNames(styles.wrapper, className)}
                {...props}
                // src={_fallBack || src}
                src={src || _fallBack}
                alt={alt}
                ref={ref}
                onError={handleError}
            />
        );
    },
);

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallBack: PropTypes.string,
};

export default Image;
