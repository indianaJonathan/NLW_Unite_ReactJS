import { ComponentProps } from "react";

interface NavLinkProps extends ComponentProps<'a'>{
    active?: boolean;
}

export function NavLink ({ children, active = false, ...rest}: NavLinkProps) {
    return (
        <a {...rest} className={`flex items-center gap-2 font-medium text-sm ${active && 'text-zinc-300 bg-white/5'} px-3 py-2 rounded-md hover:bg-white/5`}>
            { children }
        </a>
    );
}