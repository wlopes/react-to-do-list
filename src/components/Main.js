import TaskContext from '../context/TaskProvider';
import './Main.css';
import Task from './Task'
import { useContext, useState } from 'react';
import Modal from './Modal';

function Main() {  
  const [filter, setFilter] = useState({hasFilter:false,value:"-1"})
  const [modalIsOpen, setModalIsOpen] = useState(false)
    
  const context = useContext(TaskContext)  

  const handleSelectChange = (e) => {
    let value = e.target.value
    let hasFilter = value !== "-1"
    setFilter({hasFilter, value})
  }    

  const handleNewTaskClick = () => {
    setModalIsOpen(true)
  }

  return (    
    <main>
        <button className="add-task-button" type="button" onClick={handleNewTaskClick}>Nova Tarefa</button>
        <select value={filter.hasFilter ? filter.value : "-1"} className='selection' onChange={handleSelectChange}>
          <option value="-1">Todos</option>
          <option value='1'>Completas</option>
          <option value="0">Incompletas</option>
        </select>
        <div className='task-area'>
          {
            Object.values(context.tasks).filter((t)=>{
              if(filter.hasFilter){
                let f = parseInt(filter.value)
                return ((f && t.completed) || (!f && !t.completed))
              }else{
                return true;
              }
            }).map((t,i) => {
              return <Task key={t.id} task={t} index={i} />
            })
          }                    
        </div>
        <Modal isOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}></Modal>
    </main>    
  );
}

export default Main;