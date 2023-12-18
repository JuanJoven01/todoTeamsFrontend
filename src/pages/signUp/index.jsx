import { Link, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import axios from 'axios'

import PurpleButton from '../../components/button'
import ErrorDialog from '../../components/errorDialog'
import SuccessfulDialog from '../../components/successfulDialog'
import Loading from '../../components/loading'

import './signup.css'

function SignUp() {

  // check if the user is logged in

  const navigate = useNavigate()
  
  useEffect(() => {
    if (localStorage.getItem('token_todo_teams')){
      navigate('/current-logged')
    }
  }, [navigate])

  // create the states to manage the error and successful dialogs

  const [error, setError] = useState([false])
  const [loading, setLoading] = useState(false)
  const [successful, setSuccessful] = useState([false])
  const handleSubmit = () => {
    // create a const to save the data of the form
    const bodyRequest = {
      'name': document.querySelector('input[name="name"]').value.toLowerCase(),
      'mail': document.querySelector('input[name="mail"]').value,
      'password': document.querySelector('input[name="password"]').value,
      'confirm_password': document.querySelector('input[name="confirm_password"]').value,

    }
    // create a const to save the headers of the request
    const headers = {
      'link': 'teams.juanjoven.com',
      'api-key': 'EstoEsSoloUnaPrueba',
      'Accept': '*/*'

    }

    // check if the passwords match
    if (bodyRequest.password !== bodyRequest.confirm_password) {
      setError([true, 'Error', 'The passwords do not match']) && setLoading(false)
    }
    // start the request to the backend to create the user 
    else{
      // if the passwords match, delete the confirm_password field to send the request
      delete bodyRequest.confirm_password
      setLoading(true)
      // this function is to create the user across the post method
      

      const  createUser = async () => {
        try {
          const backendUrl = 'https://todo-teams-backend.onrender.com'
          const res = await axios.post(backendUrl+'/new-user', bodyRequest, {headers})
          if (res.data.error) {
            setError([true, 'Error', res.data.error])
            setLoading(false)
          }
          else{
            setSuccessful([true, 'Success', 'User created successfully'])
            let data = res.data;
            data = JSON.stringify(data)
            setLoading(false)        
          }
        } catch (error) {
          setError([true, 'Error', 'An error occurred while creating the user'])
          setLoading(false)
        }
        

      }
      createUser()
    }

  }
  // This is the view of the component
  return (
    <div className='signup'>
      <h1 className='signup__title'>
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

      <form className='signup__form'>

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
        
        <div className='form__button' onClick={handleSubmit} >
          <PurpleButton   text='Sign Up' />
        </div>
        

      </form>

      <Link to='/login' className='signup__link' >Have you got a user? Log in</Link>

      {loading && createPortal( <Loading />, document.body) }

    </div>
  )
}

export default SignUp
