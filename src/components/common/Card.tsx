import React, { forwardRef } from 'react';
import {BoxProps} from "@/types/props";

export const Card = forwardRef<HTMLDivElement, BoxProps>(({
  className,
  children,
  hasLogo,
  hasMainTitle,
  mainTitle,
  title,
  subtitle,
  fullWidth,
  ...props
}, ref) => {
    return (
        <div
            ref={ref}
            className={`p-8 border border-gray-300 bg-gray-100 rounded-md ${fullWidth ? 'w-full' : 'w-fit'} ${className || ''}`}
            {...props}
        >
            {hasMainTitle && mainTitle && (
                <h2 className="text-2xl font-bold mb-4">{mainTitle}</h2>
            )}

            {hasLogo ? (
                <div className="flex flex-col justify-items-center">
                    <div className="flex items-center mb-7">
                        <img
                            src="/images/BookingListImg.png"
                            className="mr-4 rounded size-12"
                        />
                        <div>
                            {title && <h3 className="text-lg font-bold">{title}</h3>}
                            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
                        </div>
                    </div>
                    {children}
                </div>
            ) : (
                <div>{children}</div>
            )}
        </div>
    );
    }
);

Card.displayName = 'Card';