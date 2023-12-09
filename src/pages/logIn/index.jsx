import { Link} from 'react-router-dom'
import { useState } from 'react'
import { createPortal } from 'react-dom'

import axios from 'axios'

import PurpleButton from '../../components/button'
import ErrorDialog from '../../components/errorDialog'
import SuccessfulDialog from '../../components/successfulDialog'
import Loading from '../../components/loading'

import './login.css'

const LogIn = () => {

  const [error, setError] = useState([false])
  const [loading, setLoading] = useState(false)
  const [successful, setSuccessful] = useState([false])
 
  // This is the view of the component
  return (
    <div className='login'>
      <h1 className='login__title'>
        Here you can register to start using the app
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
          name='name' />

        <input 
          type="email" 
          placeholder='Email'
          name='mail' />

        <input 
          type="password" 
          placeholder='Password'
          name='password' />

        <input 
          type="password" 
          placeholder='Confirm Password'
          name='confirm_password' />
        
        <div className='form__button' >
          <PurpleButton   text='Sign Up' />
        </div>
        

      </form>

      <Link to='/login' className='login__link' >Have you got a user? Log in</Link>

      {loading && createPortal( <Loading />, document.body) }

    </div>
  )
}

export default LogIn
