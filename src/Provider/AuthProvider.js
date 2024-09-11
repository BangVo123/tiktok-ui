import { useState, createContext, useContext } from 'react';
import AuthContent from '~/components/Modal/AuthModal/AuthContent';
import LoginContent from '~/components/Modal/AuthModal/LoginContent';
import ResetPasswordContent from '~/components/Modal/AuthModal/ResetPasswordContent';
import SignupContent from '~/components/Modal/AuthModal/SignupContent';

const Context = createContext({});

function AuthProvider({ children }) {
    const [comp, setComp] = useState('AuthContent');
    const authComponent = new Map([
        ['AuthContent', <AuthContent />],
        ['LoginContent', <LoginContent />],
        ['SignupContent', <SignupContent />],
        ['ResetPasswordContent', <ResetPasswordContent />],
    ]);

    return (
        <Context.Provider
            value={{
                component: authComponent.get(comp),
                setComponent: setComp,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export const useAuth = () => useContext(Context);

export default AuthProvider;
