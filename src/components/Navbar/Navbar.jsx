import { NavLink } from "react-router-dom"  

import style from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={style.navbar}>
            <NavLink to="/" className={style.brand}>
            Mini <span>Blog</span>
            </NavLink>
            <ul className={style.links_list}>
                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? style.active : "")}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={({ isActive }) => (isActive ? style.active : "")}>
                        Sobre
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/login" className={({ isActive }) => (isActive ? style.active : "")}>
                        Entrar
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/register" className={({ isActive }) => (isActive ? style.active : "")}>
                        Cadastrar
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
