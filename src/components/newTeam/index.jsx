import { useEffect, useRef, useState } from 'react'


import axios from 'axios'

import PurpleButton from '../../components/button'
import RedButton from '../../components/redButton'

import './newTeam.css'

const NewTeam = (props) => {

  const aliasRef = useRef(null)


  // this function create the new Team

  const createTeam = async (e) => {
    e.preventDefault()
    props.setLoading(true)
    try {
      const response = await axios.post('https://todo-teams-backend.onrender.com/teams/create-team',
        {
          alias: aliasRef.current.value
        },
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
        props.setNewTeam(false)
        props.setSuccessful([true, 'Successful', 'The team was created'])
        props.setMyTeams()
      }
    } catch (error) {
      props.setLoading(false)
      props.setError([true, 'Error', error.message])
    }
  }

  return (

    <div className='new-team'>

      <form className='new-team__form'>
        
        <label 
        className='new-team__label'
        htmlFor="title"
         >
          Alias: *
        </label>
        <input 
          type="text" 
          placeholder='Alias of the team'
          name='title'
          ref={aliasRef}
        />

        <div className='form__buttons' >
          <div className='purple-button both-buttons' onClick={createTeam}  >
            <PurpleButton   text='Create' />
          </div>
          <div className='red-button both-buttons' onClick={()=> props.setNewTeam(false)} >
            <RedButton   text='Cancel' />
          </div>
        </div>
        

      </form>

    </div>
  )
}

export default NewTeam
