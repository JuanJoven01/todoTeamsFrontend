import { useEffect, useRef, useState } from 'react'


import axios from 'axios'

import PurpleButton from '../../components/button'
import RedButton from '../../components/redButton'

import './newSingleTask.css'

const NewSingleTask = (props) => {

  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const deadlineRef = useRef(null)

  //this function send a post request to create the task

  const createTask = async (e) => {
    e.preventDefault()
    props.setLoading(true)
    try {
      let body = null
      if (deadlineRef.current.value) {
        body = {
          title: titleRef.current.value,
          description: descriptionRef.current.value,
          deadline: deadlineRef.current.value
        }
      }else{
        body = {
          description: descriptionRef.current.value,
          title: titleRef.current.value,
        }
      }

      const response = await axios.post('https://todo-teams-backend.onrender.com/tasks/create-single-task',
        
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
      console.log(response.data)
      if (response.data.error) {
        props.setError([true, 'Error', response.data.error])
      } else {
        props.setNewSingleTask(false)
        props.setSuccessful([true, 'Successful', 'The task was created'])
        
        props.setUpdateTask(false)
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
        />

        <label 
          className='update-tasks__label'
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
          <div className='red-button both-buttons' onClick={()=> props.setNewSingleTask(false)} >
            <RedButton   text='Cancel' />
          </div>
        </div>
        

      </form>

    </div>
  )
}

export default NewSingleTask
