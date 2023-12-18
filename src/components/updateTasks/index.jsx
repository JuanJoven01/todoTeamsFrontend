import { useEffect, useRef, useState } from 'react'


import axios from 'axios'

import PurpleButton from '../../components/button'
import RedButton from '../../components/redButton'

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
      if (task.data.error) {
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
  const descriptionRef = useRef(null)
  const deadlineRef = useRef(null)

  while (taskData == null) {
    return (
      <div className='update-tasks'>
        
      </div>
    )
  }

  //this function send a put request to update the task

  const updateTask = async (e) => {
    e.preventDefault()
    props.setLoading(true)

    let body = null

    if (deadlineRef.current.value) {
       body = {
        "title": titleRef.current.value,
        "description": descriptionRef.current.value,
        "deadline": deadlineRef.current.value
      }
    } else {
       body = {
        "title": titleRef.current.value,
        "description": descriptionRef.current.value,
      }
    }

    try {
      const response = await axios.put('https://todo-teams-backend.onrender.com/tasks/update-task/'+props.taskId,
        body,            
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': 'EstoEsSoloUnaPrueba',
            'Accept': '*/*',
            'Authorization': `Bearer ${localStorage.getItem('token_todo_teams')}`
          }
        },
      )
      props.setLoading(false)
      if (response.data.error) {
        props.setError([true, 'Error', response.data.error])
      } else {
        props.setSuccessful([true, 'Successful', 'The task was updated'])
        props.setUpdateTask([false, null])
        props.setUpdateTaskState(props.updateTaskState+1)
        props.setUpdateTeamTaskState(props.updateTeamTaskState+1)
      }
    } catch (error) {
      props.setLoading(false)
      props.setError([true, 'Error', error.message])
    }
  }

  return (

    <div className='update-tasks'>

      <form className='update-tasks__form'>
        
        <label 
        className='update-tasks__label'
        htmlFor="title"
         >
          Title: *
        </label>
        <input 
          type="text" 
          placeholder='Title of the task'
          name='title'
          ref={titleRef}
          defaultValue={taskData.title} 
        />

        <label 
        className='update-tasks__label'
        htmlFor="description"
         >
          Description:
        </label>
        <input 
          type="text" 
          placeholder='Description of the task'
          name='description'
          ref={descriptionRef}
          defaultValue={taskData.description} 
        />

        <label 
          className='update-tasks__label'
          htmlFor="description"
         >
          Deadline:
        </label>
        <input 
          type='date' 
          placeholder='Description of the task'
          name='description'
          ref={deadlineRef}
          defaultValue={null} 

          
        />

        <div className='form__buttons' >
          <div className='purple-button both-buttons' onClick={updateTask}>
            <PurpleButton   text='Update' />
          </div>
          <div className='red-button both-buttons' onClick={()=>props.setUpdateTask([false,null])}>
            <RedButton   text='Cancel' />
          </div>
        </div>
        

      </form>

    </div>
  )
}

export default UpdateTasks
