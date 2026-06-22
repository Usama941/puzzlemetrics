"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface BookingContextType {
  isOpen: boolean;
  source: string;
  openBooking: (source?: string) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType>({
  isOpen: false,
  source: "",
  openBooking: () => {},
  closeBooking: () => {},
});

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("");

  const openBooking = (src = "") => {
    setSource(src);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeBooking = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <BookingContext.Provider value={{ isOpen, source, openBooking, closeBooking }}>{children}</BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
