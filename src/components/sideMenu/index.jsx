import { NavLink } from "react-router-dom"


import './sideMenu.css'

const links = [
    {path: '/', text: 'Home'},
    {path: '/tasks', text: 'Tasks'},
    {path: '/teams', text: 'Teams'},
    {path: '/login', text: 'Log in'},
    {path: '/signup', text: 'Sign up'},
]

const SideMenu = () => {  

    return (
        <div className="side-menu">
            <ul className="side-menu__list">
                {links.map(({path, text}) => (
                    <li key={path} className="side-menu__li">
                        <NavLink to={path} className="side-menu__link">
                            {text}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
        
 
    )
    }

    export default SideMenu