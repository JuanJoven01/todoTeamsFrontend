import { Link, redirect, useParams} from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

import axios from 'axios'

import PurpleButton from '../../components/button'
import ErrorDialog from '../../components/errorDialog'
import SuccessfulDialog from '../../components/successfulDialog'
import Loading from '../../components/loading'

import './tasks.css'

const Tasks = () => {

  const [error, setError] = useState([false])
  const [loading, setLoading] = useState(false)
  const [successful, setSuccessful] = useState([false])

  const [ownTasks, setOwnTasks] = useState([])

  const getMyTasks = async () => {
    try {
      setLoading(true)
      console.log(`Bearer ${localStorage.getItem('token_todo_teams')}`)
      const response = await axios.get('https://todo-teams-backend.onrender.com/tasks', 
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': 'EstoEsSoloUnaPrueba',
            'Accept': '*/*',
            'Authorization': `Bearer ${localStorage.getItem('token_todo_teams')}`
          }
        })
        
      setLoading(false)
      console.log(response.data)
      if (response.data.error) {
        setError([true, 'Error', response.data.error])
      } else {
        setOwnTasks(response.data)
        
        
        // pending to add the redirect to the tasks page
      }
    } catch (error) {
      setLoading(false)
      setError([true, 'Error', error.message])
    }
  }

  useEffect(() => {
    getMyTasks(ownTasks)
  },[])
 
  // This is the view of the component
  return (

    <div className='tasks'>
      <h1 className='tasks__title'>
        Here you can see your own tasks, the tasks of your team and create or update the tasks.
      </h1>

      <p className='tasks__subtitle'>
        Your own tasks:
      </p>

      <div className='own_tasks' >
        {ownTasks.map((task, index) => (
          <div className='own_tasks__container' key={index}>
            <p className='own_tasks__task__title'>
              {task.title}
            </p>
            <p className='own_tasks__task__description'>
              {task.description}
            </p>
            <p className='own_tasks__task__status'>
              {task.status}
            </p>
            <p className='own_tasks__task__assigned'>
              {task.assigned}
            </p>
            <p className='own_tasks__task__deadline'>
              {task.deadline}
            </p>
          </div>
        ))}
      </div>

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

    </div>
  )
}

export default Tasks
