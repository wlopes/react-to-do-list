import './App.css';
import Main from './components/Main'
import TaskContext from './context/TaskProvider';
import { useEffect, useState } from 'react';
import moment from 'moment'

function App() {
  const [tasks, setTasks] = useState({}    )
  const [storageLoaded, setStorageLoaded] = useState(false)  

  useEffect(()=>{
    if(storageLoaded){      
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  },[tasks])

  useEffect(()=>{
    let data = JSON.parse(localStorage.getItem('tasks'))
    let tasks = {}
    Object.keys(data).forEach((k) => {
      tasks[k] = {...data[k], createdAt:moment(data[k].createdAt)}
    })    
    setStorageLoaded(true)
    setTasks(tasks)
  },[])

  return (
    <TaskContext.Provider value={{tasks:tasks, setTasks:setTasks}}>
      <div className="App">
        <h1 className="App-Title">My To Do List</h1>
        <Main />        
        <footer>developed by wlopes404 v0.1.0</footer>        
      </div>
    </TaskContext.Provider>    
  );
}

export default App;
