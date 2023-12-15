import { useEffect, useRef, useState } from 'react'


import axios from 'axios'

import PurpleButton from '../button'
import RedButton from '../redButton'

import './sendInvitation.css'

const SendInvitation = (props) => {

  const usernameRef = useRef(null)


  // this function create the new Team

  const teamId = props.teamId

  const sendInvitation = async () => {

    props.setLoading(true)
    try {
      const response = await axios.post(`https://todo-teams-backend.onrender.com/teams/invite`,
        {
          username: usernameRef.current.value,
          teamId: teamId
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
      
      }else {
        props.setSendInvitation(false)
        props.setSuccessful([true, 'Successful', 'The invitation was sent'])
      }
    } catch (error) {
      console.log(error)
      props.setLoading(false)
      props.setError([true, 'Error', error.message])
    }
  }
  
  return (

    <div className='send-invitation'>

      <form className='send-invitation__form'>
        
        <label 
        className='send-invitation__label'
        htmlFor="username"
         >
          White the username of the person you want to invite: *
        </label>
        <input 
          type="text" 
          placeholder='Username'
          name='username'
          ref={usernameRef}
        />

        <div className='form__buttons' >
          <div className='purple-button both-buttons' onClick={()=> sendInvitation()}  >
            <PurpleButton   text='Invite' />
          </div>
          <div className='red-button both-buttons' onClick={()=>props.setSendInvitation(false)}  >
            <RedButton   text='Cancel' />
          </div>
        </div>
        

      </form>

    </div>
  )
}

export default SendInvitation
