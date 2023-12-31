import { Link, redirect, useNavigate} from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

import axios from 'axios'

import PurpleButton from '../../components/button'
import ErrorDialog from '../../components/errorDialog'
import SuccessfulDialog from '../../components/successfulDialog'
import Loading from '../../components/loading'

import NewTeam from '../../components/newTeam'
import TeamsCard from '../../components/teamsCard'


import './teams.css'
import SendInvitation from '../../components/sendInvitation'
import InvitationsCard from '../../components/InvitationsCard'

const Teams = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token_todo_teams')) {
      navigate('/')
    }
  },[navigate])

  const [error, setError] = useState([false])
  const [loading, setLoading] = useState(false)
  const [successful, setSuccessful] = useState([false])

  const [newTeam, setNewTeam] = useState(false)

  const [myTeams, setMyTeams] = useState(null)

  const [sendInvitation, setSendInvitation] = useState(false)

  const [teamId, setTeamId] = useState(null)

  const [myInvitations, setMyInvitations] = useState(null)

  // this state is used to render teams and invitations

  const [updateTeamState, setUpdateTeamState] = useState(0)
  const [updateInvitationState, setUpdateInvitationState] = useState(0)

  //this function get my teams
  
  const getMyTeams = async () => {
    try {
      setLoading(true)
      const response = await axios.get('https://todo-teams-backend.onrender.com/teams/my-teams',
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': 'EstoEsSoloUnaPrueba',
            'Accept': '*/*',
            'Authorization': `Bearer ${localStorage.getItem('token_todo_teams')}`
          }
        })
      setLoading(false)
      if (response.data.error) {
        setError([true, 'Error', response.data.error])
      } else {
        setMyTeams(response.data)
      }
    } catch (error) {
      setLoading(false)
      setError([true, 'Error', error.response.data.message])
    }
  }

  //this function get my invitations to a teams


  const getMyInvitations = async () => {
    try {
      setLoading(true)
      const response = await axios.get('https://todo-teams-backend.onrender.com/teams/my-invitations',
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': 'EstoEsSoloUnaPrueba',
            'Accept': '*/*',
            'Authorization': `Bearer ${localStorage.getItem('token_todo_teams')}`
          }
        })
      setLoading(false)
      if (response.data.error) {
        setError([true, 'Error', response.data.error])
      } else {
        setMyInvitations(response.data)
      }
    } catch (error) {
      setLoading(false)
      setError([true, 'Error', error.response.data.message])
    }
  }

  useEffect(() => {
    getMyInvitations()
    
  },[updateInvitationState])

  useEffect(() => {
    getMyTeams()
  },[updateTeamState])

  while (myTeams == null  || myInvitations == null) {

    return (
      <div >
        {createPortal( <Loading />, document.body) }
      </div>
    
    )
  }

  // this function evaluate if the user has pending invitations

  const validatePendingInvitations = () => {
    if (myInvitations.length > 0) {
      return (
        myInvitations.map((invitation) => (
          
          <InvitationsCard 
            key={invitation.id} 
            invitation={invitation}

            error={error}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
            successful={successful}
            setSuccessful={setSuccessful}
            setSendInvitation={setSendInvitation}
            updateInvitationState={updateInvitationState}
            setUpdateInvitationState={setUpdateInvitationState}

           
           />
       ))
      )
    } else {
      return (
        <div className='no-pending-invitations' >
          <p>
            You don't have pending invitations
          </p>
        </div>
      )
    }
  }

  //this function validate if the user has teams
  const validateUserTeams =()=>{
    if (myTeams.length > 0) {
      return (
        myTeams.map((team) => (
          <TeamsCard 
           key={team.teamId} 
           team={team}

           error={error}
           setError={setError}
           loading={loading}
           setLoading={setLoading}
           successful={successful}
           setSuccessful={setSuccessful}
           setSendInvitation={setSendInvitation}

           setTeamId={setTeamId}
           
           />
       ))
      )
    } else {
      return (
        <div className='no-teams' >
          <p>
            You don't have teams
          </p>
        </div>
      )
    }
  }
  
  return (

    <div className='teams'>
      <h1 className='teams__title'>
        Here you can see your own Teams, create a new Team, send invitations or accept invitations to join a team.
      </h1>

      <p className='teams__subtitle'>
        Your Teams:
      </p>

      <div className='my_teams' >
        {validateUserTeams()}

      </div>

      <div className='create-new-team ' onClick={()=>setNewTeam(true)} >
        <PurpleButton text='Create a New Team' />
      </div>
      <p className='teams__subtitle'>
        Your Pending Invitations:
      </p>
      <div className='my_invitations' >
        {validatePendingInvitations()}

      </div>

      {/* Bellow are the portals calls */}

      {error[0] && createPortal(
        <ErrorDialog 
          title={error[1]}
          message={error[2]}
          onClose={() => setError([false])}
        />,
        document.body
      )}

      {successful[0] && createPortal(
        <SuccessfulDialog 
          title={successful[1]}
          message={successful[2]}
          onClose={() => setSuccessful([false])}
        />,
        document.body
      )}

      {loading && createPortal( <Loading />, document.body) }

      {newTeam && createPortal(
        <NewTeam 
          error={error}
          setError={setError}
          loading={loading}
          setLoading={setLoading}
          successful={successful}
          setSuccessful={setSuccessful}
          setNewTeam={setNewTeam}
          setMyTeams={setMyTeams}
          setUpdateTeamState={setUpdateTeamState}
          updateTeamState={updateTeamState}
        />,
        document.body
      )}


      {sendInvitation && createPortal(
        <SendInvitation 
          error={error}
          setError={setError}
          loading={loading}
          setLoading={setLoading}
          successful={successful}
          setSuccessful={setSuccessful}
          setNewTeam={setNewTeam}
          setSendInvitation={setSendInvitation}
          teamId={teamId}
        />,
        document.body
      )}

     

    </div>
  )
}

export default Teams
