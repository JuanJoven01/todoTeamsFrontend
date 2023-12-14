import { useEffect, useRef, useState } from 'react'


import axios from 'axios'

import PurpleButton from '../../components/button'

import './UpdateTasks.css'

const UpdateTasks = (props) => {

  const [taskData, setTaskData] = useState(null)

  // this function call the data of the task
  async function getTask (taskId)  {
    try {
      props.setLoading(true)
      const task = await axios.get('https://todo-teams-backend.onrender.com/tasks/'+taskId,
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': 'EstoEsSoloUnaPrueba',
            'Accept': '*/*',
            'Authorization': `Bearer ${localStorage.getItem('token_todo_teams')}`
          }
        })
      props.setLoading(false)
      console.log(task.data)
      if (task.data.error) {
        console.log('this error')
        props.setError([true, 'Error', task.data.error])
      } else {
        setTaskData(task.data)
      }
    } catch (error) {
      props.setLoading(false)
      props.setError([true, 'Error', error.message])
    }
  }

  useEffect(() => {
    getTask(props.taskId)
  },[])
  

  const titleRef = useRef(null)
  const passwordRef = useRef(null)

  while (taskData == null) {
    return (
      <div className='update-tasks'>
        
      </div>
    )
  }

  return (

    <div className='update-tasks'>

      <form className='update-tasks__form'>
        <label 
        className='update-tasks__label'
        htmlFor="title"
         >
          Title:
        </label>
        <input 
          type="text" 
          placeholder='Title of the task'
          name='title'
          ref={titleRef}
          defaultValue={taskData.title} 
          />

        <input 
          type="password" 
          placeholder='Password'
          name='password'
          ref={passwordRef} />
        
        <div className='form__button' >
          <PurpleButton   text='Log In' />
        </div>
        

      </form>

    </div>
  )
}

export default UpdateTasks
