
import { useState, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom"
import { createPortal } from 'react-dom';

import { NavBarContext } from "../../context/navBar.context";


import SideMenu from "../sideMenu";

import { CiMenuBurger } from "react-icons/ci";
import { BsMicrosoftTeams } from "react-icons/bs";

import './navBar.css'   


const  NavBar = () => {

    const {  showNav } = useContext(NavBarContext);


    const [showMenu, setShowMenu] = useState(false);

    return (
            
            <nav className="navbar">

                    <Link to='/' className="navbar__div">  
                    
                        <BsMicrosoftTeams className="div__icon"/>

                        <p className="div__title">To-Do Teams</p>
        
                    </Link>

                    <ul className="navbar__ul">
                        {showNav.map(({path, text}) => (
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

                    {showMenu && createPortal(<SideMenu toClose={()=>setShowMenu(false)} />, document.body)}
                

            </nav>

    )
}

export default NavBar