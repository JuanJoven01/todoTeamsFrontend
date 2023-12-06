// To 
import { useState } from "react";
import { NavLink } from "react-router-dom"
import { createPortal } from 'react-dom';
import SideMenu from "../sideMenu";

import { CiMenuBurger } from "react-icons/ci";
import { BsMicrosoftTeams } from "react-icons/bs";

import './navBar.css'   

const links = [
    {path: '/', text: 'Home'},
    {path: '/tasks', text: 'Tasks'},
    {path: '/teams', text: 'Teams'},
    {path: '/login', text: 'Log in'},
    {path: '/signup', text: 'Sign up'},

]

const  NavBar = () => {

    const [showMenu, setShowMenu] = useState(false);

    return (

        

            <nav className="navbar">

                <div className="navbar__div">
                    <BsMicrosoftTeams className="div__icon"/>

                    <p className="div__title">To-Do Teams</p>
                </div>
               

                <ul className="navbar__ul">
                    {links.map(({path, text}) => (
                        <li key={path} className="ul__li">
                            <NavLink to={path} className="ul__link">
                                {text}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                    
                <CiMenuBurger className="navbar__menu" 
                onClick={()=>setShowMenu(!showMenu)}
                />

                {showMenu && createPortal(<SideMenu/>, document.body)}
                
            </nav>

    )
}

export default NavBar