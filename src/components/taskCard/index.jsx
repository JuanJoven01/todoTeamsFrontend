import { IoCheckmarkDoneCircle } from "react-icons/io5";


import PurpleButton from "../button";
import RedButton from "../redButton";


import axios from 'axios'

import './taskCard.css'

const TaskCard = (props) => {

    // this function helps us to define how the status of the task will be displayed

    const completedStatus = () => {
        if (props.task.completed) {
            return (
                <div className='task-card__completed task-card__both'>
                    <IoCheckmarkDoneCircle className='task-card__completed-icon task-card__icon--both text-green-500 ' />
                </div>
            )
        } else {
            return (
                <div className='task-card__not-complete task-card--both'>
                    <IoCheckmarkDoneCircle className='task-card__completed-icon  task-card__icon--both text-gray-400' />
                </div>
            )
        }
    }

    //this function call the component to update the task

    

    const changeStatus = async () => {

        try {
            props.setLoading(true)
            let finishedAt = null
            if (props.task.completed == false) {
                finishedAt = new Date()
            }
            const change =  await axios.put('https://todo-teams-backend.onrender.com/tasks/update-task/'+props.task.id,
            {
                "completed": !props.task.completed,
                "finishedAt": finishedAt
            },            
            {
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': 'EstoEsSoloUnaPrueba',
                    'Accept': '*/*',
                    'Authorization': `Bearer ${localStorage.getItem('token_todo_teams')}`
                  }
            },
            )

            if (change.data.error) {   
                props.setError([true, 'Error', change.data.error])
        
            } else {
                props.setLoading(false)
                // props.getMyTasks()
                props.setUpdateTaskState(props.updateTaskState+1)
                props.setUpdateTeamTaskState(props.updateTeamTaskState+1)
            }
            
        
        
        }catch(error){
            props.setError([true, 'Error', error.response.data.message])
            props.setLoading(false)
        }
        
    }
    return (
        
        <div className='task-card__container'>
            
            <div className="task-card__header" onClick={changeStatus}  >
                {completedStatus()}
                <p className={props.task.completed?'task-card__title task-card__title--decoration':'task-card__title'} >
                        {props.task.title}
                </p>
            </div>
            
            <p className='task-card__description'>
                <span>Description:</span> {props.task.description}
            </p>

            <div className='task-card__dates'>
                <p className='task-card__date'>
                    <span>Created:</span>     {props.task.createdAt}
                </p>
                <p className='task-card__date'>
                    <span>Updated:</span> {props.task.updatedAt}
                </p>
                <p className='task-card__date'>
                    <span>Deadline:</span> {props.task.deadline}
                </p>
                <p className='task-card__date'>
                    <span>Finished:</span> {props.task.finishedAt}
                </p>
                
            </div>

            <div className="task-card__buttons">
                <div className="purple-button both-button" onClick={()=> props.setUpdateTask([true,props.task.id])}>
                    <PurpleButton text='Update' />
                </div>

                <div className="red-button both-button" 
                onClick={()=> 
                    props.setDeleteTask([true,props.task.id,props.task.title])} >
                    <RedButton text='Delete' />
                </div>

            </div>

            

        </div>

        


    )

}

export default TaskCard;