import { createContext, useContext, useState } from 'react';

const ModalContext = createContext({});

const ModalProvider = ({ children }) => {
    const [isShowAuthModal, setIsShowAuthModal] = useState(false);

    const handleOpenAuthModal = () => {
        setIsShowAuthModal(true);
    };

    const handleCloseModal = () => {
        setIsShowAuthModal(false);
    };
    return (
        <ModalContext.Provider
            value={{
                isOpen: isShowAuthModal,
                onCloseModal: handleCloseModal,
                onOpenModal: handleOpenAuthModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);

export default ModalProvider;
