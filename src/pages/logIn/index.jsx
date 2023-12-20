import { useState, useEffect, useRef, useContext } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { createPortal } from 'react-dom'

import axios from 'axios'

import PurpleButton from '../../components/button'
import ErrorDialog from '../../components/errorDialog'
import SuccessfulDialog from '../../components/successfulDialog'
import Loading from '../../components/loading'

import './login.css'

import { NavBarContext } from "../../context/navBar.context";



const LogIn = () => {

  // check if the user is logged ii
  const [loggedIn, setLoggedIn] = useState('not logged in')

  useEffect(() => {

    if (localStorage.getItem('token_todo_teams')){
      setLoggedIn('logged in')
    }
  }, [])
  const navigate = useNavigate()
  
  useEffect(() => {
    if (loggedIn == 'logged in'){
      navigate('/current-logged')
    }else if (loggedIn == 'just logged in'){
      navigate('/tasks')
    }
    
  }, [navigate, loggedIn])
  

  const [error, setError] = useState([false])
  const [loading, setLoading] = useState(false)
  const [successful, setSuccessful] = useState([false])

  const nameRef = useRef(null)
  const passwordRef = useRef(null)

  const { setChangeNav, changeNav } = useContext(NavBarContext);
  // function to send the login Request

  const sendLoginRequest = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post('https://todo-teams-backend.onrender.com/login', 
        {
          name : nameRef.current.value.toLowerCase(),
          password : passwordRef.current.value  
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': 'EstoEsSoloUnaPrueba',
            'Accept': '*/*',
          }
        })
      setLoading(false)
      if (response.data.error) {
        setError([true, 'Error', response.data.error])
      } else {
        setSuccessful([true, 'Successful', 'Welcome ' + response.data.user.name + ' you are logged in'])
        localStorage.setItem('token_todo_teams', response.data.token)
        setLoggedIn('just logged in')
        setChangeNav(changeNav + 1)
        
        
        // pending to add the redirect to the tasks page
      }
    } catch (error) {
      setLoading(false)
      setError([true, 'Error', 'Invalid user or password'])
    }
  }
    
 
  // This is the view of the component
  return (
    <div className='login'>
      <h1 className='login__title'>
       Please insert your credentials
      </h1>

      {error[0] && createPortal(
        <ErrorDialog 
          title={error[1]}
          message={error[2]}
          onClose={() => setError([false])}
        />,
        document.body
      )}

      {successful[0] && createPortal(
        <SuccessfulDialog 
          title={successful[1]}
          message={successful[2]}
          onClose={() => setSuccessful([false])}
        />,
        document.body
      )}

      <form className='login__form'>

        <input 
          type="name" 
          placeholder='Nickname / Alias'
          name='name'
          ref={nameRef} />


        <input 
          type="password" 
          placeholder='Password'
          name='password'
          ref={passwordRef} />
        
        <div className='form__button' onClick={sendLoginRequest} >
          <PurpleButton   text='Log In' />
        </div>
        

      </form>

      <Link to='/recovery-password' className='login__link' >Did you forget your password? Recovery</Link>

      <Link to='/activate-user' className='login__link' >Your user is not activated yet? activate it here</Link>

      {loading && createPortal( <Loading />, document.body) }

    </div>
  )
}

export default LogIn
