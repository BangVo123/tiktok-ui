import { useState, forwardRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Image.module.scss';
import images from '~/assets/images';

const Image = forwardRef(({ src, alt = '', className, ...props }, ref) => {
    const [image, setImage] = useState(src);

    const handleError = () => {
        setImage(images.noImage);
    };

    return (
        <img
            className={classNames(styles.wrapper, className)}
            {...props}
            src={image || images.noImage}
            alt={alt}
            ref={ref}
            onError={handleError}
        />
    );
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallBack: PropTypes.string,
};

export default Image;
