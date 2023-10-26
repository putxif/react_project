import "./index.scss";
import {Link, NavLink, useLocation} from "react-router-dom";

const Navbar = () => {
    let location = useLocation(); //alteracao do prof ao windows. q estava aqui
    if (location.pathname === "/") return null; //nao mostrar na pagina de login //alterou aqui tambem

    return (
        <div className={"Navbar"}>
            <NavLink to="/home">
                <img src="/assets/icons/home.svg"/>
            </NavLink>
            <NavLink to="/search">
                <img src="/assets/icons/search.svg"/>
            </NavLink>
            <NavLink to={"/tickets"}>
                <img src="/assets/icons/ticket.svg"/>
            </NavLink>
            <NavLink to="/personal">
                <img src="/assets/icons/user.svg"/>
            </NavLink>
        </div>
    )
}


export default Navbar;