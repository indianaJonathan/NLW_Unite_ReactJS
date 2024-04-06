import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonProps extends ComponentProps<'button'> {
    transparent?: boolean
}

export function IconButton ({ transparent = false, disabled, ...rest }: IconButtonProps) {
    return (
        <button
            className={twMerge(
                'border border-white/10 rounded-md p-1.5',
                transparent ? 'bg-black-20 hover:bg-white/10' : 'bg-white/10 hover:bg-black/20',
                disabled ? 'opacity-50' : null,
            )}
            disabled={disabled}
            {...rest}
        />
    );
}