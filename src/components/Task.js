import './Task.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import TaskContext from '../context/TaskProvider'
import Modal from './Modal'

const Task = ({task, index}) => {  
    const [modalIsOpen, setModalIsOpen] = useState(false)    

    const context = useContext(TaskContext)

    const handleCheckClick = ()=>{
        let newTask = {...task}
        newTask.completed = !newTask.completed
        context.tasks[task.id] = newTask        
        context.setTasks({...context.tasks})
    }

    const handleTrashClick = ()=>{
        delete(context.tasks[task.id])
        context.setTasks({...context.tasks})
    }

    const handleEditClick = ()=>{
        setModalIsOpen(true)
    } 

    return (
    <div className={`task${task.completed ? ' marked' : ''}`}>
        <div className='check-button' onClick={handleCheckClick}>
            <FontAwesomeIcon icon={faCheck} />
        </div>
        <div className="task-middle">
            <span className="task-title">{task.name}</span>
            <span className="task-date">{task.createdAt.format('dddd[,] DD/MM/YYYY ')}</span>
        </div>
        <button className='tail-button' onClick={handleTrashClick}>
            <FontAwesomeIcon icon={faTrash} />
        </button>
        <button className='tail-button' onClick={handleEditClick}>
            <FontAwesomeIcon icon={faEdit} />
        </button>
        <Modal task={task} isOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>
    </div>
  )
}

export default Task;