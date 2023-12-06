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
          type="text" 
          placeholder='Name'
          name='name' />


        <input type="text" placeholder='Last Name' />
        <input type="text" placeholder='Email' />
        <input type="text" placeholder='Password' />
        <input type="text" placeholder='Confirm Password' />
        <PurpleButton href='#' text='Sign Up' />
      </form>


    </div>
  )
}

export default SignUp
