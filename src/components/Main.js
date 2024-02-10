import TaskContext from '../context/TaskProvider';
import './Main.css';
import Task from './Task'
import { useContext, useState } from 'react';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose, faFileExport, faFileImport } from '@fortawesome/free-solid-svg-icons'

function Main() {  
  const [filter, setFilter] = useState({hasFilter:false,value:"-1"})
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [menuIsOpen, setMenuIsOpen] = useState(false)
    
  const context = useContext(TaskContext)  

  const handleSelectChange = (e) => {
    let value = e.target.value
    let hasFilter = value !== "-1"
    setFilter({hasFilter, value})
  }    

  const handleNewTaskClick = () => {
    setModalIsOpen(true)
  }

  const toggleMenu = ()=>{
    setMenuIsOpen(!menuIsOpen)
  }

  const exportTasks = ()=>{
    const fileData = JSON.stringify(context.tasks);
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.download = `tasks.json`;
    link.href = url;
    link.click();   
    
    setMenuIsOpen(false)
  }

  const importTasks = ()=>{
    const input = document.createElement('input');
    input.type = 'file'
    input.accept = 'application/JSON'

    input.onchange = async (e)=>{
      try {
        let reader = new FileReader();
        reader.onload = (event)=>{
          let json = JSON.parse(event.target.result);
                    
          context.setTasks(context.convertDataToTasks(json))
          setMenuIsOpen(false)

          alert('Arquivo importado com sucesso')
        };
        reader.readAsText(e.target.files[0]);        
      }catch(exception){
        alert(`Falha ao ler o arquivo`)
      }      
    }

    input.click()
  }

  return (    
    <main>
        <button className="add-task-button" type="button" onClick={handleNewTaskClick}>Nova Tarefa</button>
        <div className='header-right'>
          <select value={filter.hasFilter ? filter.value : "-1"} className='selection' onChange={handleSelectChange}>
            <option value="-1">Todos</option>
            <option value='1'>Completas</option>
            <option value="0">Incompletas</option>
          </select>
          <button className="menu-button" onClick={toggleMenu}>
            <FontAwesomeIcon icon={menuIsOpen ? faClose : faBars} />
          </button>
          {menuIsOpen && <div className='menu'>
            <button onClick={exportTasks}>Exportar Tarefas <FontAwesomeIcon icon={faFileExport} /></button>
            <button onClick={importTasks}>Importar Tarefas <FontAwesomeIcon icon={faFileImport} /></button>
          </div>}
        </div>        
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