import React, { createContext } from 'react';

export type BookingModalContextType = {
    openBookingModal: () => void;
};

export const BookingModalContext = createContext<BookingModalContextType>({
    openBookingModal: () => { }
});

export const BookingModalProvider = BookingModalContext.Provider;
