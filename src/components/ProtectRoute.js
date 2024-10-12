import { useEffect } from 'react';
import { useUser } from '~/Provider/UserProvider';
import { toast } from 'react-toastify';

import { Navigate } from 'react-router-dom';

function ProtectRoutes({ children, private: isPrivate }) {
    const { isAuthenticate } = useUser();
    useEffect(() => {
        if (isPrivate && !isAuthenticate) toast.warn('User not authenticate');
    }, []);

    if (isPrivate && !isAuthenticate) {
        return <Navigate to={'/'} replace />;
    }
    return <>{children}</>;
}

export default ProtectRoutes;
