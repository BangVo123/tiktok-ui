import { useEffect } from 'react';
import { useUser } from '~/Provider/UserProvider';
import { toast } from 'react-toastify';

import { Navigate } from 'react-router-dom';

function ProtectRoutes({ children, private: isPrivate }) {
    const { isAuthenticate } = useUser();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isPrivate && !isAuthenticate) console.log(1);
            // toast.warn('User not authenticate');
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (isPrivate && !isAuthenticate) {
        return <Navigate to={'/'} replace />;
    }
    return <>{children}</>;
}

export default ProtectRoutes;
