import { Link} from 'react-router-dom'

import PurpleButton from '../../components/button'

import './signup.css'

function SignUp() {

  return (
    <div className='signup'>
      <h1 className='signup__title'>
        Here you can register to start using the app
      </h1>

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
        
        <div className='form__button'>
          <PurpleButton  href='#' text='Sign Up' />
        </div>
        

      </form>

      <Link to='/login' className='signup__link' >Have you got a user? Log in</Link>

    </div>
  )
}

export default SignUp
