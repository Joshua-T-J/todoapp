import React, { useState , useEffect} from "react";
import "./Todo.css";

// localStorage implementation

export default function Todo() {
  const [ToDos, setToDos] = useState(() => {
    // get the todos from localstorage
    const savedTodos = localStorage.getItem("todos");
    // if there are todos stored
    if (savedTodos) {
      // return the parsed the JSON object back to a javascript object
      return JSON.parse(savedTodos);
      // otherwise
    } else {
      // return an empty array
      return [];
    }
  });

  useEffect(() => {
    
    localStorage.setItem("todos", JSON.stringify(ToDos));
    
  }, [ToDos]);
  
  const [ToDo, setToDo] = useState("");
  const handleRemoveItem = (key) => {
    const newToDos = [...ToDos];
    newToDos.splice(key, 1);
    setToDos(newToDos);
  };

  //  Display day in h1

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const d = new Date();
  let day = weekday[d.getDay()];

  const displayToDo = () => {
    if(ToDo){
      setToDos([...ToDos, { id: Date.now(), text: ToDo, status: false }]);
      setToDo("");
    }
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List &nbsp;<i className="fa-solid fa-clipboard-list"></i></h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, It's {day} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          value={ToDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i className="fas fa-plus" onClick={() => displayToDo()}></i>
      </div>
      <div className="todos">
        {ToDos.map((obj, index) => {
          return (
            <div className="todo">
              <div className="left">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    setToDos(
                      ToDos.filter((obj2) => {
                        if (obj2.id === obj.id) {
                          obj2.status = e.target.checked;
                        }
                        return obj2;
                      })
                    );
                  }}
                  value={obj.status}
                />
                <p className={obj.status ? "strike" : ""}>{obj.text}</p>
              </div>
              <div className="right">
                <i
                  className="fas fa-times"
                  onClick={() => handleRemoveItem(index)}
                ></i>
              </div>
            </div>
          );
        })}
        <div className="task-display">
          <table>
            <tbody>
              <tr>              
                <th className="progress">Progress</th>
                <th className="completed">Completed</th>
              </tr>
              {ToDos.map((obj) => {
                if (obj.status) {
                  return (
                    <tr>
                      <td></td>
                      <td className="completed">{obj.text}</td>
                    </tr>
                  );
                }else{
                  return(
                  <tr>
                    <td className="progress">{obj.text}</td>
                    <td></td>
                  </tr>
                  );
                }
                })
              }

            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}
