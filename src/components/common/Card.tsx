import React, { forwardRef } from 'react';
import { BoxProps } from "@/types/components/commonProps";
import Image from 'next/image';

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
            className={`p-6 border border-gray-300 bg-gray-100 text-gray-600 rounded-md ${fullWidth ? 'w-full' : 'w-fit'} ${className || ''}`}
            {...props}
        >
            {hasMainTitle && mainTitle && (
                <h2 className="text-2xl font-bold mb-4">{mainTitle}</h2>
            )}

            <div>
                {title && <h3 className="text-lg font-bold">{title}</h3>}
                {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
                {children}
            </div>
        </div>
    );
    }
);

Card.displayName = 'Card';