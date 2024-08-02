import { useState } from 'react';
import AboutItem from './AboutItem';
import config from '~/config';

function About() {
    const [isActive, setIsActive] = useState(-1);
    const onClick = (idx) => {
        if (isActive === idx) {
            setIsActive(-1);
        } else {
            setIsActive(idx);
        }
    };
    return (
        <>
            {config.about.map((el, idx) => (
                <AboutItem
                    key={idx}
                    aboutItem={el}
                    onClick={onClick}
                    idx={idx}
                    isActive={idx === isActive}
                />
            ))}
        </>
    );
}

export default About;
