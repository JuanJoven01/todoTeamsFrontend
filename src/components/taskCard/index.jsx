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
                props.setSuccessful([true, 'Successful', 'The task was updated'])
                
                props.getMyTasks()
            }
            props.setLoading(false)
        
        
        }catch(error){
            props.setError([true, 'Error', error.message])
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
                Description: {props.task.description}
            </p>

            <div className='task-card__dates'>
                <p className='task-card__date'>
                    Created: {props.task.createdAt}
                </p>
                <p className='task-card__date'>
                    Updated: {props.task.updatedAt}
                </p>
                <p className='task-card__date'>
                    Deadline: {props.task.deadline}
                </p>
                <p className='task-card__date'>
                    Finished: {props.task.finishedAt}
                </p>
                
            </div>

            <div className="task-card__buttons">
                <div className="purple-button both-button">
                    <PurpleButton text='Update' />
                </div>

                <div className="red-button both-button">
                    <RedButton text='Delete' />
                </div>

            </div>

            

        </div>

        


    )

}

export default TaskCard;