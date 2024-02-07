import './Modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useContext } from 'react'
import TaskContext from '../context/TaskProvider'
import { v4 } from 'uuid'
import moment from 'moment'

function Modal({task, isOpen, setModalIsOpen}){             
    const [name, setName] = useState('')
    const [isCompleted, setCompleted] = useState(false)

    const context = useContext(TaskContext)

    useEffect(()=>{
        if(task){
            setName(task.name)
            setCompleted(task.completed)
        }
    },[task, isOpen])
    
    const handleXClick = ()=>{
        setModalIsOpen(false)
    }
    const handleSelectChange = (e) => {
        let value = e.target.value
        setCompleted(value==='1')
    }

    const handleSaveClick = () => {        
        if(task){
            //update
            context.tasks[task.id] = {...task, name:name, completed:isCompleted}            
        }else{
            //new task
            let uuid = v4()
            context.tasks[uuid] = {id:uuid, name:name, completed:isCompleted, createdAt:moment()}
        }
        context.setTasks({...context.tasks})
        setModalIsOpen(false)
    }
    
    return isOpen && (
        <div className={'Modal'}>
            <div className='container'>
                <h3>{task ? `Editando ${task.name}` : 'Nova Tarefa'}</h3>
                <form>
                    <label htmlFor="name">Name</label>
                    <input id="name" type='text' value={name} onChange={(e)=>{setName(e.target.value)}}/>
                    <label htmlFor="status">Estado</label>
                    <select id="status" value={isCompleted ? '1' : '0'} onChange={handleSelectChange}>
                        <option value='1'>Completa</option>
                        <option value="0">Incompleta</option>
                    </select>
                </form>
                <div className='controller'>
                    <button className='accept-button' onClick={handleSaveClick}>Salvar</button>
                    <button className='cancel-button' onClick={handleXClick}>Cancelar</button>
                </div>
                <button className="xbutton" onClick={handleXClick}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
            </div>
        </div>
    )
}

export default Modal;