import {useRoutes, BrowserRouter} from 'react-router-dom'

import Home from '../home'
import LogIn from '../logIn'
import RecoveryPassword from '../recoveryPassword'
import SignIn from '../signIn'
import Tasks from '../tasks'
import Teams from '../teams'
import NotFound from '../notFound'

import '../../app.css'

const AppRoutes = () => {

  const routes = useRoutes(
      [
        {path: '/', element: <Home/>},
        {path: '/login', element: <LogIn/>},
        {path: '/recovery-password', element: <RecoveryPassword/>},
        {path: '/sign-in', element: <SignIn/>},
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
        <AppRoutes/>
      </BrowserRouter>
    </>
  )
}

export default App
