import './App.css';
import Main from './components/Main'
import TaskContext from './context/TaskProvider';
import { useEffect, useState } from 'react';
import moment from 'moment'

function App() {
  const [tasks, setTasks] = useState({}    )
  const [storageLoaded, setStorageLoaded] = useState(false)  

  const convertDataToTasks = (data)=>{
    let r = {}
    Object.keys(data).forEach((k) => {
      r[k] = {...data[k], createdAt:moment(data[k].createdAt)}
    })
    return r;
  }

  useEffect(()=>{
    if(storageLoaded){      
      localStorage.setItem('tasks', JSON.stringify(tasks));      
    }
  },[tasks, storageLoaded])

  useEffect(()=>{
    let data = JSON.parse(localStorage.getItem('tasks'))        
    if(data){      
      setTasks(convertDataToTasks(data))      
    }
    setStorageLoaded(true)    
  },[])

  return (
    <TaskContext.Provider value={{tasks:tasks, setTasks:setTasks, convertDataToTasks}}>
      <div className="App">
        <h1 className="App-Title">My To Do List</h1>
        <Main />        
        <footer>developed by wlopes404 v0.2.0</footer>        
      </div>
    </TaskContext.Provider>    
  );
}

export default App;
