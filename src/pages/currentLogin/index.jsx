import { useNavigate } from 'react-router-dom'
import { useEffect, useState} from 'react'



import PurpleButton from '../../components/button'


import './current-logged.css'

const CurrentLogged = () => {

  const navigate = useNavigate()
  const [loggedOut, setLoggedOut] = useState(false)

  
  // This function delete the auth token from the local storage and redirect to the login page
  const logOut = (e) => {
    e.preventDefault()
    localStorage.removeItem('token_todo_teams')
    setLoggedOut(true)
  }

  useEffect(() => {
    if (loggedOut){
      navigate('/')
    }
  }, [navigate, loggedOut])

  
  // This is the view of the component
  return (
    <div className='current-logged'>
      <h1 className='current-logged__title'>
       You are currently logged in,  do you want to Log Out?
      </h1>


      <form className='current-logged__form'>
        
        <div className='form__button' onClick={logOut} >
          <PurpleButton   text='Log Out' />
        </div>
        

      </form>

    </div>
  )
}

export default CurrentLogged
