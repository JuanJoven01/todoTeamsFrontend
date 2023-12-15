
import PurpleButton from "../button";

import './teamsCard.css'

const TeamsCard = (props) => {
    //this function help us to obtain the team data

    const getTeamData =  () => {
        const teamId = props.team.teamId
        const teams = props.team.teams
        for (const team of teams) {
            if (team.id === teamId) {
                return team
            }
        }
    }

    const theTeam = getTeamData()

    //this function use setTeamId to send the teamId to the parent component and opens the send invitation component

    const saveUserId = () => {
        props.setTeamId(theTeam.id)
        props.setSendInvitation(true)
    }

    console.log(props)

    return (
        
        <div className='teams-card__container'>
            
            <div className="teams-card__data" >
                <p>
                    <span>Alias:</span> {theTeam.alias}
                </p>

                <p>
                <span>Admin:</span> {theTeam.admin}
                </p>
  
            </div>

            <div className="teams-card__button" onClick={()=>saveUserId()} >
                <PurpleButton text='Invite' />
            </div>
           

        </div>

    )

}

export default TeamsCard;