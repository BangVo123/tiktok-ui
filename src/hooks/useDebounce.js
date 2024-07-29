import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debounceVal, setDebounceVal] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebounceVal(value), delay);

        return () => clearTimeout(handler);
    }, [value]);

    return debounceVal;
}

export default useDebounce;
