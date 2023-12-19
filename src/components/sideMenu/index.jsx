import { useContext } from "react"
import { NavLink } from "react-router-dom"

import { NavBarContext } from "../../context/navBar.context"


import './sideMenu.css'

const SideMenu = (props) => {  

    const {  showNav } = useContext(NavBarContext);

    return (
        <div className="side-menu">
            <ul className="side-menu__list">
                {showNav.map(({path, text}) => (
                    <li key={path} className="side-menu__li">
                        <NavLink to={path} className="side-menu__link" onClick={props.toClose} >
                            {text}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
        
 
    )
    }

    export default SideMenu