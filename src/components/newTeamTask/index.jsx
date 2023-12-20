import { useEffect, useRef, useState } from 'react'


import axios from 'axios'

import PurpleButton from '../../components/button'
import RedButton from '../../components/redButton'

import './newTeamTask.css'

const NewTeamsTask = (props) => {

  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const deadlineRef = useRef(null)
  //this function send a post request to create the task

  const createTask = async (e) => {
    e.preventDefault()
    props.setLoading(true)
    try {
      let body = {title: titleRef.current.value};
      descriptionRef.current.value&& (body.description = descriptionRef.current.value);
      // this code is to get the deadline date and hour and normalize to zulu to send to the backend
      if (deadlineRef.current.value) {
        const date = new Date(deadlineRef.current.value);
        const ans = date.toUTCString();
        console.log(ans);
        body.deadline = ans;
        }

      const response = await axios.post('https://todo-teams-backend.onrender.com/tasks/create-team-tasks/'+props.newTeamTasks[1],
        
        body
        ,
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
        props.setNewTeamTasks([false,null])
        props.setSuccessful([true, 'Successful', 'The task was created'])
        props.setUpdateTask(false)
        props.setUpdateTeamTaskState(props.updateTeamTaskState+1)
      }
    } catch (error) {
      props.setLoading(false)
      props.setError([true, 'Error', error.response.data.message])
    }
  }

  return (

    <div className='new-team-task'>

      <form className='new-team-task__form'>
        
        <label 
        className='new-team-task__label'
        htmlFor="title"
         >
          Title: *
        </label>
        <input 
          type="text" 
          placeholder='Title of the task'
          name='title'
          ref={titleRef}
        />

        <label 
        className='new-team-task__label'
        htmlFor="description"
         >
          Description:
        </label>
        <input 
          type="text" 
          placeholder='Description of the task'
          name='description'
          ref={descriptionRef}
        />

        <label 
          className='new-team-task__label'
          htmlFor="deadline"
         >
          Deadline:
        </label>
        <input 
          type='date' 
          placeholder='Description of the task'
          name='deadline'
          ref={deadlineRef}
          defaultValue={null}
        />

        <div className='form__buttons' >
          <div className='purple-button both-buttons' onClick={createTask } >
            <PurpleButton   text='Create' />
          </div>
          <div className='red-button both-buttons' onClick={()=> props.setNewTeamTasks([false,null])} >
            <RedButton   text='Cancel' />
          </div>
        </div>
        

      </form>

    </div>
  )
}

export default NewTeamsTask
