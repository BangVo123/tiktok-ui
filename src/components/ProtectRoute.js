import { useContext, useEffect } from 'react';
import { UserContext } from '~/Provider/UserProvider';
import { toast } from 'react-toastify';

import { Navigate } from 'react-router-dom';

function ProtectRoutes({ children, private: isPrivate }) {
    const { isAuthenticate } = useContext(UserContext);
    useEffect(() => {
        if (isPrivate && !isAuthenticate) toast.warn('User not authenticate');
    }, []);

    if (isPrivate && !isAuthenticate) {
        return <Navigate to={'/'} replace />;
    }
    return <>{children}</>;
}

export default ProtectRoutes;
