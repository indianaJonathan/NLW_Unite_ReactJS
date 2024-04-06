import { Contact, List } from "lucide-react";
import logo from "../assets/nlw-unite.svg";
import { NavLink } from "./nav-link";

export function Header () {
    return (
        <div className="flex flex-row items-center gap-5 py-2">
            <img src={logo} />
            <nav className="flex items-center gap-5">
                <NavLink href="" active={false}>
                    <List className="size-5"/>
                    <span>
                        Eventos
                    </span>
                </NavLink>
                <NavLink href="" active>
                    <Contact className="size-5"/>
                    <span>
                        Participantes
                    </span>
                </NavLink>
            </nav>
        </div>
    );
}