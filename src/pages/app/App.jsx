import {useRoutes, BrowserRouter} from 'react-router-dom'

import Home from '../home'
import LogIn from '../logIn'
import RecoveryPassword from '../recoveryPassword'
import SignUp from '../signUp'
import Tasks from '../tasks'
import Teams from '../teams'
import NotFound from '../notFound'

import NavBar from '../../components/navBar'

import '../../app.css'
import './app.css'

const AppRoutes = () => {

  const routes = useRoutes(
      [
        {path: '/', element: <Home/>},
        {path: '/login', element: <LogIn/>},
        {path: '/recovery-password', element: <RecoveryPassword/>},
        {path: '/signup', element: <SignUp/>},
        {path: '/tasks', element: <Tasks/>},
        {path: '/teams', element: <Teams/>},
        {path: '*', element: <NotFound/>},
      ]
  )

  return routes
}

function App() {


  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <AppRoutes/>
      </BrowserRouter>
    </>
    
  )
}

export default App
