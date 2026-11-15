
import { useEffect, useState } from 'react';

 const Todo = () => {
    const [input, setInput] = useState("")
    const [todos, setTodos] = useState([])

    const handleAdd = () => {

        const newTodo = {
            id: Date.now(),
            text: input,
            isCompleted: false
        }

        setTodos((prev)=> [...prev, newTodo])


    }



    const toggleTodo = (id) => {
        setTodos((todos)=> todos.map((item)=>item.id === id ? {...item, isCompleted: true} : item))
    }

    const handleDelete = (id) => {
        setTodos((previousTodos)=>previousTodos.filter((item)=>item.id !== id))

    }

    return(

        <div>
           <h1>My Tasks</h1>
           <input 
           type="text"
           placeholder=" enter your todo"
           onChange={(e) => setInput(e.target.value)}
           value={input}
           />

           <button onClick = {handleAdd}> add </button>

           {todos.map((item)=>(
            <div style={{display:"flex", justifyContent: "center", gap: 50 }}>
                <div style={{display:"flex", textDecoration:item.isCompleted? "line-through": "none"}}>
                <input
                type="checkbox"
                checked={item.isCompleted}
                onChange={() => toggleTodo(item.id)}
                />
                <h2>{item.text}</h2>
                </div>


            <div>
            <button className="delete-btn" onClick={()=>handleDelete(item.id)}>
              Delete
            </button>
            </div>
                </div>
           ))}

        </div>

        
    )
}

export default Todo;
