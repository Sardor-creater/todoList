import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import API from '../api';
import PajinationComponent from './PajinationComponent';

const Todolist = () => {
    const [todos, setTodos] = useState([]);
    const [todoEditing, setTodoEditing] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage] = useState(10);
  
    const onUpdateTodo = (id) => {
      const todoItemIndex = todos.findIndex((x) => x.id === id);
      const newTodos = [...todos];
      const newTodo = newTodos[todoItemIndex];
      newTodo.completed = !newTodo.completed;
      newTodos[todoItemIndex] = newTodo;
      setTodos(newTodos);
    };
   
  
    useEffect(() => {
      const fetchData = async()=>{
        let response = await API.get('todos');
        setTodos(response.data);
        console.log(response);
      }
  
      fetchData();
    }, []);
  
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
    const paginate = pageNumber => setCurrentPage(pageNumber);
  
  
    const hAdd = async (title) => {
      let result = await API.post('todos', {'title': title, completed: false });
      console.log(result);
      if(result.status !==201){
        return
      } else{
        setTodos((todos)=>[result.data, ...todos])
      }
    }
  
    const onDelete = async (id) => {
      let result = await API.delete(`todos/${id}`);
      if(result.status !==200){
        return
      } else{
        setTodos(todos.filter((todo)=> {
          return todo.id !== id
        } ) )
      }
    }
  
    const onUpdate = (id) => {
      setTodoEditing(id)
    }
  
    const onSubmitEdit = async (id, editingText, completed) => {
      let result = await API.put(`todos/${id}`,{title:editingText, completed });
      if(result.status !==200){
        return
      } else{
        console.log(result);
        const updatedTodos = [...todos].map((todo) => {
        if (todo.id === id) {
          todo.title = editingText;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setTodoEditing(null);
      }
    }
        return (
            <div className="App">
            {
            todos ? 
            <div className='container'>
              <AddTodo hAdd={hAdd} />
              <ul className='list-group'>
              {currentTodos.map((todo) => (
            <Todo key={uuidv4()}  id={todo.id} title={todo.title} completed={todo.completed} onDelete={onDelete} onUpdate={onUpdate} onUpdateTodo={onUpdateTodo} todoEditing={todoEditing} onSubmitEdit={onSubmitEdit} />
              ))}
            </ul>
            <PajinationComponent
              todosPerPage={todosPerPage}
              totalTodos={todos.length}
              paginate={paginate}
            />
            </div>
            : 
            <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          }
          </div>
        )
}

export default Todolist;