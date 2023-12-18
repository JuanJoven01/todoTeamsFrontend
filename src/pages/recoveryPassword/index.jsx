import { Link, redirect} from 'react-router-dom'
import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'

import axios from 'axios'

import PurpleButton from '../../components/button'
import ErrorDialog from '../../components/errorDialog'
import SuccessfulDialog from '../../components/successfulDialog'
import Loading from '../../components/loading'

import './recovery.css'

const RecoveryPassword = () => {

  const [error, setError] = useState([false])
  const [loading, setLoading] = useState(false)
  const [successful, setSuccessful] = useState([false])

  const emailRef = useRef(null)

  // function to send the recovery Request

  const sendRecoveryRequest = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post('https://todo-teams-backend.onrender.com/recovery', 
        {
          mail : emailRef.current.value
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': 'EstoEsSoloUnaPrueba',
            'Accept': '*/*',
            'link': 'teams.juanjoven.com/'
          }
        })
      setLoading(false)
      if (response.data.error) {
        setError([true, 'Error', response.data.error])
      } else {
        setSuccessful([true, 'Successful', 'We send a recovery link to your email'])
        localStorage.setItem('token_todo_teams', response.data.token)
        
        
        // pending to add the redirect to the tasks page
      }
    } catch (error) {
      setLoading(false)
      setError([true, 'Error', error.message])
    }
  }
    
 
  // This is the view of the component
  return (
    <div className='recovery'>
      <h1 className='recovery__title'>
       Please insert Email to send you a recovery link
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

      <form className='recovery__form'>

        <input 
          type="email" 
          placeholder='Insert your Email'
          name='name'
          ref={emailRef} />

        
        <div className='form__button' onClick={sendRecoveryRequest} >
          <PurpleButton   text='Send Recovery Link' />
        </div>
        

      </form>

      <Link to='/recovery-password/change-pass' className='recovery__link' >Have you got a recovery token? Click here</Link>

      {loading && createPortal( <Loading />, document.body) }

    </div>
  )
}

export default RecoveryPassword
