import { useState, useEffect } from "react";

import PurpleButton from "../button";

import axios from "axios";

import TaskCard from "../taskCard";

import './teamsTaskCard.css'

const TeamsTaskCard = (props) => {

    const teamId = props.team.teamId
    const currentTeam = props.team.teams[0]


    const [teamTasks, setTeamTasks] = useState([])

    //this function shows the teams tasks

    const showTeamTasks = async () => {
        props.setLoading(true)
        try {
            const response = await axios.get('https://todo-teams-backend.onrender.com/tasks/get-team-tasks/'+teamId,
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
                setTeamTasks(response.data)
            }
        } catch (error) {
            props.setLoading(false)
            props.setError([true, 'Error', error.message])
        }
    }

    useEffect(() => {
        showTeamTasks()
    },[props.updateTeamTaskState])

    //this function  show the tasks or skeleton

    const showTasks = () => {
        while (teamTasks ==null){
            return(
                <div className="teams-task-card__skeleton" >
                    <p>Loading...</p>
                </div>

            )
        }
        return(
            <div className="teams-task-card" >
                {teamTasks.map((task) => (
                    <TaskCard 
                        key={task.id} 
                        task={task} 
                        setError={props.setError} 
                        setLoading={props.setLoading}
                        setSuccessful={props.setSuccessful} 
                        setUpdateTask={props.setUpdateTask} 
                        updateTask={props.updateTask}
                        setDeleteTask={props.setDeleteTask}
                        setUpdateTaskState={props.setUpdateTaskState}
                        updateTaskState={props.updateTaskState}
                        setUpdateTeamTaskState={props.setUpdateTeamTaskState}
                        updateTeamTaskState={props.updateTeamTaskState}
                        />
                    ))}
            </div>
        )
    }

    return (
        
        <div className='teams-task-card__container'>
            
            <div className="teams-task-card__data" >
                <p>
                    <span>Team:</span> {currentTeam.alias}
                </p>

                <p className="teams-task-card__data--small">
                    Admin: {currentTeam.admin}
                </p>
  
            </div>

            {showTasks()}

            <div className='own_tasks__button' onClick={()=>props.setNewTeamTasks([true,teamId])} >
                <PurpleButton text='New Team Task' />
            </div>

        </div>

    )

}

export default TeamsTaskCard;