import { useEffect, useRef, useState } from 'react'


import axios from 'axios'

import PurpleButton from '../../components/button'
import RedButton from '../../components/redButton'

import './deleteTasks.css'

const DeleteTasks = (props) => {

  //this function send a delete request to delete the task

  const deleteTask = async (e) => {
    e.preventDefault()
    props.setLoading(true)
    try {
      const response = await axios.delete('https://todo-teams-backend.onrender.com/tasks/delete-task/'+props.taskId,
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': 'EstoEsSoloUnaPrueba',
            'Accept': '*/*',
            'Authorization': `Bearer ${localStorage.getItem('token_todo_teams')}`
          }
        })
      props.setLoading(false)
      if (response.data.error) {
        props.setError([true, 'Error', response.data.error])
      } else {
        props.setSuccessful([true, 'Successful', 'The task was deleted'])
        props.setDeleteTask([false,null,null])
        props.setUpdateTask([false,null])
        props.setUpdateTaskState(props.updateTaskState+1)
        props.setUpdateTeamTaskState(props.updateTeamTaskState+1)
        

      }
    } catch (error) {
      props.setLoading(false)
      props.setError([true, 'Error', error.response.data.message])
    }
  }


  return (

    <div className='delete-tasks'>

      <h1 className='delete-task__title' >
        Are you sure that want to delete the task <span className='delete-task__title--span' >* {props.taskName} *</span>  ?
      </h1>

      <div className='form__buttons' >
        <div className='purple-button both-buttons' onClick={()=>props.setDeleteTask([false,null,null])}>
          <PurpleButton   text='Cancel' />
        </div>
        <div className='red-button both-buttons' onClick={deleteTask} >
          <RedButton   text='Delete it' />
        </div>
      </div>
        
    </div>
  )
}

export default DeleteTasks
