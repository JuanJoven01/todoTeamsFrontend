import { Link, redirect, useParams} from 'react-router-dom'
import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'

import axios from 'axios'

import PurpleButton from '../../components/button'
import ErrorDialog from '../../components/errorDialog'
import SuccessfulDialog from '../../components/successfulDialog'
import Loading from '../../components/loading'

import './change-password.css'

const ChangePassword = () => {

  const [error, setError] = useState([false])
  const [loading, setLoading] = useState(false)
  const [successful, setSuccessful] = useState([false])

  const tokenRef = useRef(null)
  const passwordRef = useRef(null)
  const password2Ref = useRef(null)

  const searchParams = new URLSearchParams(location.search);
  const defaultToken = searchParams.get('token');

  // function to send the change-password Request




  const changePasswordRequest = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (passwordRef.current.value !== password2Ref.current.value) {
      setError([true, 'Error', 'Passwords do not match'])
      setLoading(false)
      return
    }
    try {
      const response = await axios.post('https://todo-teams-backend.onrender.com/recovery/change-pass?token='+tokenRef.current.value, 
        {
          
          password: passwordRef.current.value,
          
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
        setSuccessful([true, 'Successful', 'Your password has been changed successfully'])
        
        // pending to add the redirect to login page
      }
    } catch (error) {
      setLoading(false)
      setError([true, 'Error', error.response.data.message])
    }
  }
    
 
  // This is the view of the component
  return (
    <div className='change-password'>
      <h1 className='change-password__title'>
       Please insert the activation link that we send you to your email and your new password
      </h1>

      <p className='change-password__subtitle'>
        Your recovery token should be set automatically in the input below, if not, please copy and paste it from the email.
      </p>

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

      <form className='change-password__form'>

        <input 
          type="text"
          placeholder='Insert recovery token'
          name='token'
          ref={tokenRef} 
          defaultValue={defaultToken}
          />


          <input 
          type="password"
          placeholder='Insert your new password'
          name='password'
          ref={passwordRef} />

          <input 
          type="password"
          placeholder='repeat your new password'
          name='password2'
          ref={password2Ref} />
        
        <div className='form__button' onClick={changePasswordRequest} >
          <PurpleButton   text='Change Password' />
        </div>
        

      </form>

      {loading && createPortal( <Loading />, document.body) }

    </div>
  )
}

export default ChangePassword
