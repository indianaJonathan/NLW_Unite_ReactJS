import { Contact, List } from "lucide-react";
import logo from "../assets/nlw-unite.svg";
import { NavLink } from "./nav-link";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function Header () {
    const { pathname } = useLocation();
    const [activeRoute, setActiveRoute] = useState<string>(pathname);

    useEffect(() => {
        setActiveRoute(pathname);
    }, [activeRoute]);

    return (
        <div className="flex flex-row items-center gap-5 py-2">
            <img src={logo} />
            <nav className="flex items-center gap-5">
                <NavLink href="/events" active={activeRoute === "/events"} onClick={() => setActiveRoute("events")}>
                    <List className="size-5"/>
                    <span>
                        Eventos
                    </span>
                </NavLink>
                <NavLink href="/attendees" active={activeRoute.startsWith("/attendees")} onClick={() => setActiveRoute("attendees")}>
                    <Contact className="size-5"/>
                    <span>
                        Participantes
                    </span>
                </NavLink>
            </nav>
        </div>
    );
}