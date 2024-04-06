import { ComponentProps } from "react";
import { NavLink as RouterLink } from "react-router-dom";

interface NavLinkProps extends ComponentProps<'a'>{
    active?: boolean;
}

export function NavLink ({ children, href, active = false, ...rest}: NavLinkProps) {
    return (
        <RouterLink 
            {...rest}
            to={href ?? "/"}
            className={`flex items-center gap-2 font-medium text-sm ${active ? 'text-zinc-50 bg-white/5' : 'text-zinc-300 bg-transparent'} px-3 py-2 rounded-md hover:bg-white/5`}
        >
            { children }
        </RouterLink>
    );
}