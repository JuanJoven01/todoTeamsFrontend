import { NavLink } from "react-router-dom"

import { ImMenu3 } from "react-icons/im";
import { BsMicrosoftTeams } from "react-icons/bs";

const links = [
    {path: '/home', text: 'Home'},
    {path: '/login', text: 'Login'},
    {path: '/recovery-password', text: 'Recovery Password'},
    {path: '/sign-in', text: 'Sign In'},
    {path: '/tasks', text: 'Tasks'},
    {path: '/teams', text: 'Teams'},
    {path: '/not-found', text: 'Not Found'},

]

const  NavBar = () => {
    return (

            <nav className="bg-sky-400 h-10 flex justify-between content-center">

                <div className="flex justify-end items-center">
                    <BsMicrosoftTeams className="mx-5"/>

                    <p className="text-2xl font-bold inline-block">To-Do Teams</p>
                </div>
               

                <div className="flex  items-center">

                    <ul className="nav_ul flex ">
                        {links.map(({path, text}) => (
                            <li key={path} className="nav_li">
                                <NavLink to={path} className="mx-2 hover:shadow-2xl">
                                    {text}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    
                    <ImMenu3 className="mx-3 " />
                </div>
                
            </nav>

    )
}

export default NavBar