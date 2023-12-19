import { createContext, useEffect, useState, useContext } from 'react';

const NavBarContext = createContext();

const  NavBarProvider = (props) => {

    //this function help us decide what nav or side menu to show
    const [changeNav, setChangeNav] = useState(0)

    const [showNav, setShowNav] = useState([]);

    const navAndSideMenu = () => {
        if (localStorage.getItem('token_todo_teams')) {
            setShowNav([
                {path: '/', text: 'Home'},
                {path: '/tasks', text: 'Tasks'},
                {path: '/teams', text: 'Teams'},
                {path: '/current-logged', text: 'Log out'},
            ])
        } else {
            setShowNav([
                {path: '/', text: 'Home'},
                {path: '/tasks', text: 'Tasks'},
                {path: '/teams', text: 'Teams'},
                {path: '/login', text: 'Log in'},
                {path: '/signup', text: 'Sign up'},

            ])
        }
    }
        useEffect(() => {
            navAndSideMenu()
        } ,[changeNav])

    return(
        <NavBarContext.Provider 
            value={{
                changeNav, 
                setChangeNav, 
                showNav, 
                setShowNav, 
                navAndSideMenu,

            }}>

            {props.children}
        </NavBarContext.Provider>
    )
    
}

export  { NavBarProvider, NavBarContext};