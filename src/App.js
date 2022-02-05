import './App.css';
import {useState} from 'react'
function App() {
  const [ToDos,setToDos] = useState([]);
  const [ToDo,setToDo] = useState('')
  const handleRemoveItem = key => {
    const newToDos=[...ToDos]
    newToDos.splice(key,1);
    setToDos(newToDos)
   };
   const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const d = new Date();
    let day = weekday[d.getDay()];
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, It's {day} 🌝 ☕ </h2>
        
      </div>
      <div className="input">
        <input value={ToDo} onChange={(e)=>setToDo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
        <i className="fas fa-plus" onClick={()=>setToDos([...ToDos,{id:Date.now() ,text: ToDo, status: false}],)} ></i>
      </div>
      <div className="todos">
        { ToDos.map((obj ,index)=>{
          return(
            <div className="todo">
              <div className="left">
                <input type="checkbox" name="" id="" onChange={(e)=>{
                  setToDos(ToDos.filter(obj2=>{
                    if(obj2.id===obj.id){
                      obj2.status=e.target.checked;
                    }
                    return obj2;
                  }))
                }} value={obj.status} />
                <p className={obj.status ? "strike":""}>{obj.text}</p>
                
              </div>
              <div className="right">
                <i className="fas fa-times"  onClick={()=>handleRemoveItem(index)}></i>
              </div>
            </div>
          )
        })
        }
        <div className='task-display'>
          <div className='progress'>
            <h1>In Progress</h1>
            {ToDos.map((obj)=>{
              if(!obj.status){
                return(
                  <div>
                    <h3 className='task'>{obj.text}</h3>
                  </div>
                )
              }
              return null;
            })}
          </div>
          <div className='completed'>
            <h1>Completed</h1>
            {ToDos.map((obj)=>{
              if(obj.status){
                return(
                  <div>
                    <h3 className='task'>{obj.text}</h3>
                  </div>
                )
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;