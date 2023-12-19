import { useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

import axios from 'axios'

import PurpleButton from '../../components/button'
import ErrorDialog from '../../components/errorDialog'
import SuccessfulDialog from '../../components/successfulDialog'
import Loading from '../../components/loading'

import TaskCard from '../../components/taskCard'
import UpdateTasks from "../../components/updateTasks";
import DeleteTasks from '../../components/deleteTasks'
import NewSingleTask from '../../components/newSingleTask'
import TeamsTaskCard from '../../components/teamsTaskCard'
import NewTeamTask from '../../components/newTeamTask'


import './tasks.css'


const Tasks = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token_todo_teams')) {
      navigate('/')
    }
  },[navigate])

  const [error, setError] = useState([false])
  const [loading, setLoading] = useState(false)
  const [successful, setSuccessful] = useState([false])

  const [ownTasks, setOwnTasks] = useState([])

  const getMyTasks = async () => {
    try {
      setLoading(true)
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
      if (response.data.error) {
        setError([true, 'Error', response.data.error])
      } else {
        setOwnTasks(response.data)
      }
    } catch (error) {
      setLoading(false)
      setError([true, 'Error', error.response.data.message])
    }
  }

  const [updateTask, setUpdateTask] = useState([false,null])

  const [deleteTask, setDeleteTask] = useState([false,null,null])

  const [newSingleTask, setNewSingleTask] = useState(false)

  const [myTeams, setMyTeams] = useState(null)

  const [newTeamTasks, setNewTeamTasks] = useState([false,null])

  // that useState are used to recall functions
  
  const [updateTaskState, setUpdateTaskState] = useState(0)
  const [updateTeamTaskState, setUpdateTeamTaskState] = useState(0)

  useEffect(() => {
    getMyTasks()
  },[updateTaskState])
 
  // this function helps to get the teams of the user
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

  useEffect(() => {
    getMyTeams()
  },[])

  while (myTeams === null) {
    return (
       <Loading />
    )
  }

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
        {ownTasks.map((task) => (
           <TaskCard 
            key={task.id} 
            task={task}
            error={error}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
            successful={successful}
            setSuccessful={setSuccessful}
            getMyTasks={getMyTasks}
            updateTask={updateTask}
            setUpdateTask={setUpdateTask}
            deleteTask={deleteTask}
            setDeleteTask={setDeleteTask}
            setUpdateTaskState={setUpdateTaskState}
            updateTaskState={updateTaskState}
            setUpdateTeamTaskState={setUpdateTeamTaskState}
            updateTeamTaskState={updateTeamTaskState}
            />
        ))}

        <div className='own_tasks__button' onClick={()=>setNewSingleTask(true)} >
          <PurpleButton text='New Single Task' />
        </div>

      </div>

      <p className='tasks__subtitle'>
        Your shared tasks:
      </p>

      <div className='shared_tasks' >
          
          {myTeams.map((team)=>(
            <TeamsTaskCard
            key={team.teamId} 
            team={team}
            error={error}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
            successful={successful}
            setSuccessful={setSuccessful}
            getMyTasks={getMyTasks}
            updateTask={updateTask}
            setUpdateTask={setUpdateTask}
            deleteTask={deleteTask}
            setDeleteTask={setDeleteTask}
            setNewTeamTasks={setNewTeamTasks}
            setUpdateTaskState={setUpdateTaskState}
            updateTaskState={updateTaskState}
            setUpdateTeamTaskState={setUpdateTeamTaskState}
            updateTeamTaskState={updateTeamTaskState}
            />
            
          )

          )}

        
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

      {updateTask[0] && createPortal(
        <UpdateTasks 
          taskId={updateTask[1]}

          error={error}
          setError={setError}
          loading={loading}
          setLoading={setLoading}
          successful={successful}
          setSuccessful={setSuccessful}
          updateTask={updateTask}
          setUpdateTask={setUpdateTask}
          setUpdateTaskState={setUpdateTaskState}
          updateTaskState={updateTaskState}
          setUpdateTeamTaskState={setUpdateTeamTaskState}
          updateTeamTaskState={updateTeamTaskState}
        />,
        document.body
      )}

      {deleteTask[0] && createPortal(
        <DeleteTasks 
          taskName={deleteTask[2]}
          taskId={deleteTask[1]}

          error={error}
          setError={setError}
          loading={loading}
          setLoading={setLoading}
          successful={successful}
          setSuccessful={setSuccessful}
          deleteTask={deleteTask}
          setDeleteTask={setDeleteTask}
          setUpdateTask={setUpdateTask}
          setUpdateTaskState={setUpdateTaskState}
          updateTaskState={updateTaskState}
          setUpdateTeamTaskState={setUpdateTeamTaskState}
          updateTeamTaskState={updateTeamTaskState}
        />,
        document.body
      )}

      {newSingleTask && createPortal(
        <NewSingleTask 
          error={error}
          setError={setError}
          loading={loading}
          setLoading={setLoading}
          successful={successful}
          setSuccessful={setSuccessful}
          newSingleTask={newSingleTask}
          setNewSingleTask={setNewSingleTask}
          setUpdateTask={setUpdateTask}
          setUpdateTaskState={setUpdateTaskState}
          updateTaskState={updateTaskState}

        />,
        document.body
      )}

      {newTeamTasks[0] && createPortal(
        <NewTeamTask 
          error={error}
          setError={setError}
          loading={loading}
          setLoading={setLoading}
          successful={successful}
          setSuccessful={setSuccessful}
          newSingleTask={newSingleTask}
          setNewTeamTasks={setNewTeamTasks}
          setUpdateTask={setUpdateTask}
          newTeamTasks={newTeamTasks}
          updateTeamTaskState={updateTeamTaskState}
          setUpdateTeamTaskState={setUpdateTeamTaskState}
          getMyTeams={getMyTeams}

        />,
        document.body
      )}

    </div>
  )
}

export default Tasks
