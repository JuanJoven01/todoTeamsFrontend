
import '../../app.css'
import './home.css'

import PurpleButton from '../../components/button'

function Home() {

  return (
    <div className='home'>
      <h1 className='home__title'>
        Welcome to the ToDo Teams!
      </h1>

      <p className='home__subtitle'>
        This is a simple to-do list app that allows you to create teams and add tasks to them.
      </p>
      <p className='home__subtitle'>
        But if you want to work alone, you can do it too, create and track your own tasks!.
      </p>
      <p className='home__subtitle'>
        To get started, if you want log in or sign up, you can do it below.
      </p>


      <div className='home__buttons'>
        
        <PurpleButton href='/login' text='Log in'/>
        <p>or</p>
        <PurpleButton href='/signup' text='Sign up' />
      </div>

      
      
    </div>
  )
}

export default Home
