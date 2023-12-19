
import axios from "axios";

import PurpleButton from "../button";
import RedButton from "../redButton";

import './invitationsCard.css'



const InvitationsCard = (props) => {

    const invitation = props.invitation

    // this function is to accept the invitation
    const acceptInvitation = async () => {
        props.setLoading(true)
        try {
            const response = await axios.patch('https://todo-teams-backend.onrender.com/teams/accept-invitation/'+invitation.id,
                {
                    
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'api-key': 'EstoEsSoloUnaPrueba',
                        'Accept': '*/*',
                        'Authorization': `Bearer ${localStorage.getItem('token_todo_teams')}`
                    }
                })
            if (response.data.error) {
                props.setError([true, 'Error', response.data.error])
            } else {
                props.setSuccessful([true, 'Successful', 'Invitation accepted'])
                props.setUpdateInvitationState(props.updateInvitationState+1)
            }
            props.setLoading(false)
        } catch (error) {
            props.setError([true, 'Error', error.response.data.message]);
            props.setLoading(false)
        }
        
    }

    //this function is to reject the invitation

    const rejectInvitation = async () => {
        props.setLoading(true)
        try {
            const reject = await axios.patch('https://todo-teams-backend.onrender.com/teams/reject-invitation/'+invitation.id,
                {

                },
                
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'api-key': 'EstoEsSoloUnaPrueba',
                        'Accept': '*/*',
                        'Authorization': `Bearer ${localStorage.getItem('token_todo_teams')}`
                    }
                });
            if (reject.data.error) {
                props.setError([true, 'Error', reject.data.error])
            }else{
                props.setSuccessful([true, 'Successful', 'Invitation rejected'])
                props.setUpdateInvitationState(props.updateInvitationState+1)
            }
            props.setLoading(false)


        } catch (error) {
            props.setError([true, 'Error', error.response.data.message]);
            props.setLoading(false)
        }
    }
    

    return (
        
        <div className='invitations-card__container'>
            
            <div className="invitations-card__data" >
                <p>
                    <span>Alias:</span> {invitation.teams[0].alias}
                </p>

                <p>
                <span>Admin:</span>  {invitation.teams[0].admin}
                </p>
  
            </div>
            
            <div className="invitations-card__buttons" >
                <div className="invitations-card__button" onClick={()=>acceptInvitation()}  >
                    <PurpleButton text='Accept' />
                </div>

                <div className="invitations-card__button" onClick={()=>rejectInvitation()}  >
                    <RedButton text='Reject' />
                </div>

            </div>
           

        </div>

    )

}

export default InvitationsCard;