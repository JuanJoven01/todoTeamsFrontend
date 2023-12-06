

import '../../app.css'
import './home.css'

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
        But if you want to work alone, you can do it too and create and track your own tasks.
      </p>
      <p className='home__subtitle'>
        To get started, if you are not logged in, you need to register or log in.
      </p>

     


    </div>
  )
}

export default Home
