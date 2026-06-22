"use client";

import type { CSSProperties, MouseEventHandler, ReactNode } from "react";
import { useBooking } from "@/context/BookingContext";

interface BookingButtonProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  source?: string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function BookingButton({
  children,
  className,
  style,
  source = "",
  type = "button",
  onClick,
}: BookingButtonProps) {
  const { openBooking } = useBooking();

  return (
    <button
      type={type}
      onClick={(e) => {
        onClick?.(e);
        openBooking(source);
      }}
      className={className}
      style={{
        // Do not set background/border/padding/font here — inline styles beat Tailwind
        // classes and were stripping fills, borders, and typography from CTAs.
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
