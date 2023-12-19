import {useRoutes, BrowserRouter} from 'react-router-dom'

import Home from '../home'
import LogIn from '../logIn'
import RecoveryPassword from '../recoveryPassword'
import SignUp from '../signUp'
import Tasks from '../tasks'
import Teams from '../teams'
import NotFound from '../notFound'
import ActivateUser from '../activateUser'
import ActivationCode from '../activationCode'
import ChangePassword from '../changePassword'
import CurrentLogged from '../currentLogin'


import NavBar from '../../components/navBar'
import Footer from '../../components/footer'

import '../../app.css'
import './app.css'

import { NavBarProvider } from '../../context/navBar.context'

const AppRoutes = () => {

  const routes = useRoutes(
      [
        {path: '/', element: <Home/>},
        {path: '/login', element: <LogIn/>},
        {path: '/recovery-password', element: <RecoveryPassword/>},
        {path: '/recovery-password/change-pass', element: <ChangePassword/>},
        {path: '/signup', element: <SignUp/>},
        {path: '/tasks', element: <Tasks/>},
        {path: '/teams', element: <Teams/>},
        {path: '*', element: <NotFound/>},
        {path: '/activate-user', element: <ActivateUser/>},
        {path: '/activation-code', element: <ActivationCode/>},
        {path: '/current-logged', element: <CurrentLogged/>}

      ]
  )

  return routes
}

function App() {


  return (
    <>
      <BrowserRouter>
        <NavBarProvider>
          <NavBar/>
        
          <AppRoutes/>
          <Footer/>
        </NavBarProvider>
      </BrowserRouter>
    </>

  )
}

export default App
